"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { getBlogs } from "../api/blog";
import {
  PRACTICE_AREAS_SECTIONS,
  practiceAreasToNavLinks,
} from "../practiceAreas/practiceAreasData";
import moment from "moment";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [blog, setblog] = useState({
    data: [],
    pageInfo: { hasNextPage: true, endCursor: null },
    isLoading: false,
  });

  const [practiceAreas, setPracticeAreas] = useState({
    sections: PRACTICE_AREAS_SECTIONS,
    isLoading: true,
    source: "fallback",
  });

  const practiceAreaNavLinks = useMemo(
    () => practiceAreasToNavLinks(practiceAreas.sections),
    [practiceAreas.sections]
  );

  const GetDate = (dateTime) => moment(dateTime).format("DD MMM YYYY");

  const GetTime = (dateTime) => moment(dateTime).format("hh:mm A");

  const fetchblog = useCallback(async () => {
    if (blog.isLoading || !blog.pageInfo.hasNextPage) return;

    setblog((prev) => ({ ...prev, isLoading: true }));

    try {
      const { data, pageInfo } = await getBlogs(10, blog.pageInfo.endCursor);

      setblog((prev) => ({
        ...prev,
        data: [...prev.data, ...data],
        pageInfo: {
          hasNextPage: pageInfo.hasNextPage,
          endCursor: pageInfo.endCursor,
        },
        isLoading: false,
      }));
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setblog((prev) => ({ ...prev, isLoading: false }));
    }
  }, [blog.isLoading, blog.pageInfo.hasNextPage, blog.pageInfo.endCursor]);

  const fetchPracticeAreas = useCallback(async () => {
    setPracticeAreas((prev) => ({ ...prev, isLoading: true }));

    try {
      const res = await fetch("/api/practice-areas");
      const json = await res.json();

      if (!res.ok) {
        console.error(
          "[PracticeAreas] API error:",
          json.error ?? res.statusText
        );
        setPracticeAreas({
          sections: PRACTICE_AREAS_SECTIONS,
          isLoading: false,
          source: "fallback",
        });
        return;
      }

      if (json.data?.length > 0) {
        console.log(
          `[PracticeAreas] Loaded ${json.data.length} area(s) from ${json.source}`
        );
        setPracticeAreas({
          sections: json.data,
          isLoading: false,
          source: json.source ?? "hygraph",
        });
      } else {
        console.log("[PracticeAreas] No data, using fallback");
        setPracticeAreas({
          sections: PRACTICE_AREAS_SECTIONS,
          isLoading: false,
          source: "fallback",
        });
      }
    } catch (error) {
      console.error("[PracticeAreas] Fetch failed:", error);
      setPracticeAreas({
        sections: PRACTICE_AREAS_SECTIONS,
        isLoading: false,
        source: "fallback",
      });
    }
  }, []);

  useEffect(() => {
    fetchblog();
    fetchPracticeAreas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Context.Provider
      value={{
        blog,
        setblog,
        fetchblog,
        practiceAreas,
        practiceAreaNavLinks,
        fetchPracticeAreas,
        GetDate,
        GetTime,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
