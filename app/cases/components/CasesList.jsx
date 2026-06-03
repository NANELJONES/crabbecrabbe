"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import AnimateUp from "@/app/components/AnimateUp";
import CaseCard from "./CaseCard";
import { CASE_STATUS_OPTIONS, COURTS_OPTIONS } from "../caseEnums";

const PAGE_SIZE = 9;

export default function CasesList() {
  const [cases, setCases] = useState([]);
  const [practiceAreas, setPracticeAreas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [pageInfo, setPageInfo] = useState({
    hasNextPage: true,
    endCursor: null,
  });
  const [statusFilter, setStatusFilter] = useState("");
  const [courtFilter, setCourtFilter] = useState("");
  const [practiceFilter, setPracticeFilter] = useState("");

  const fetchCasesPage = useCallback(async (after = null, replace = false) => {
    const params = new URLSearchParams({ first: String(PAGE_SIZE) });
    if (after) params.set("after", after);

    const res = await fetch(`/api/cases?${params}`);
    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.error ?? "Failed to fetch cases");
    }

    setCases((prev) =>
      replace ? (json.data ?? []) : [...prev, ...(json.data ?? [])]
    );
    setPageInfo(
      json.pageInfo ?? { hasNextPage: false, endCursor: null }
    );
  }, []);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const areasRes = await fetch("/api/practice-areas");
        const areasJson = await areasRes.json();

        const areas = (areasJson.data ?? []).map((area) => ({
          slug: area.slug ?? area.id,
          name: area.title ?? area.name,
        }));
        setPracticeAreas(areas);

        await fetchCasesPage(null, true);
      } catch (error) {
        console.error("[CasesList] Fetch failed:", error);
        setCases([]);
        setPageInfo({ hasNextPage: false, endCursor: null });
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [fetchCasesPage]);

  const loadMore = useCallback(async () => {
    if (isLoadingMore || !pageInfo.hasNextPage) return;

    setIsLoadingMore(true);
    try {
      await fetchCasesPage(pageInfo.endCursor, false);
    } catch (error) {
      console.error("[CasesList] Load more failed:", error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [fetchCasesPage, isLoadingMore, pageInfo.endCursor, pageInfo.hasNextPage]);

  const filteredCases = useMemo(() => {
    return cases.filter((item) => {
      if (statusFilter && item.caseStatus !== statusFilter) return false;
      if (courtFilter && item.courts !== courtFilter) return false;
      if (
        practiceFilter &&
        !item.practiceAreas?.some((pa) => pa.slug === practiceFilter)
      ) {
        return false;
      }
      return true;
    });
  }, [cases, statusFilter, courtFilter, practiceFilter]);

  const selectClass =
    "w-full rounded-md border border-secondary_color/20 bg-white px-3 py-2.5 text-sm text-secondary_color outline-none transition-colors focus:border-primary_color";

  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label
            htmlFor="practice-filter"
            className="mb-1.5 block text-sm font-medium text-secondary_color"
          >
            Practice area
          </label>
          <select
            id="practice-filter"
            value={practiceFilter}
            onChange={(e) => setPracticeFilter(e.target.value)}
            className={selectClass}
          >
            <option value="">All practice areas</option>
            {practiceAreas.map((area) => (
              <option key={area.slug} value={area.slug}>
                {area.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="status-filter"
            className="mb-1.5 block text-sm font-medium text-secondary_color"
          >
            Status
          </label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={selectClass}
          >
            {CASE_STATUS_OPTIONS.map((opt) => (
              <option key={opt.value || "all"} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="court-filter"
            className="mb-1.5 block text-sm font-medium text-secondary_color"
          >
            Court
          </label>
          <select
            id="court-filter"
            value={courtFilter}
            onChange={(e) => setCourtFilter(e.target.value)}
            className={selectClass}
          >
            {COURTS_OPTIONS.map((opt) => (
              <option key={opt.value || "all"} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isLoading && (
        <p className="mt-10 text-secondary_color/70">Loading cases…</p>
      )}

      {!isLoading && filteredCases.length === 0 && (
        <p className="mt-10 text-secondary_color/70">
          No cases match your filters. Try adjusting the filters or check back
          soon.
        </p>
      )}

      {!isLoading && filteredCases.length > 0 && (
        <p className="mt-6 text-sm text-secondary_color/60">
          Showing {filteredCases.length} of {cases.length} loaded case
          {cases.length === 1 ? "" : "s"}
          {pageInfo.hasNextPage ? " — scroll for more" : ""}
        </p>
      )}

      {!isLoading && cases.length > 0 && (
        <InfiniteScroll
          dataLength={cases.length}
          next={loadMore}
          hasMore={pageInfo.hasNextPage}
          loader={
            <p className="mt-8 text-center text-sm text-secondary_color/70">
              Loading more cases…
            </p>
          }
          endMessage={
            filteredCases.length > 0 && !pageInfo.hasNextPage ? (
              <p className="mt-8 text-center text-sm text-secondary_color/50">
                You have seen all cases.
              </p>
            ) : null
          }
          className="!overflow-visible"
        >
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCases.map((caseItem, index) => (
              <AnimateUp
                key={caseItem.slug}
                delay={Math.min(index * 0.05, 0.3)}
              >
                <CaseCard caseItem={caseItem} />
              </AnimateUp>
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
}
