"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Import Swiper styles
import { useRouter } from "next/navigation";
import { getCategories, getBlogFromCategory } from "@/app/api/blog";
import { useStateContext } from "@/app/Context/StateContext";

const Categories = () => {
  const [active, setActive] = useState("All");
  const [categories, setCategories] = useState([]);
  const { fetchblog, setblog } = useStateContext();
  const router = useRouter();



  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategories();
      setCategories(response);
    };
    fetchCategories();
  }, []);

  const fetchCate = async (category) => {
    const response = await getBlogFromCategory(category);
    console.log("Fetched Data:", response);
    setblog((prev) => ({
      ...prev,
      data: response,
      pageInfo: { hasNextPage: false, endCursor: null },
    }));
  };

  const handleAllClick = () => {
    setActive("All");
    router.push("/blog");
    setblog({
    data: [],
    pageInfo: { hasNextPage: true, endCursor: null },
    isLoading: false,
  })
    fetchblog();
  };

  return (
    <div className="py-6 ">
      <h5>Categories</h5>
      <Swiper
        spaceBetween={10} // Spacing between items
        slidesPerView="auto" // Allows dynamic slides
        freeMode={true} // Enables smooth scrolling
        grabCursor={true} // Enables draggable behavior
        className="mt-4"
      >
        <SwiperSlide style={{ width: "auto" }}>
          <p
            onClick={handleAllClick}
            className={`${
              active === "All"
                ? "font-bold border-b-2 border-primary_color rounded-none"
                : ""
            } p-4 rounded-lg cursor-pointer shrink-0`}
          >
            All Blog & News
          </p>
        </SwiperSlide>

        {categories.map((each_category, index) => (
          <SwiperSlide key={index} style={{ width: "auto" }}>
            <p
              onClick={() => {
                setActive(each_category?.node?.category);
                fetchCate(each_category?.node?.category);
              }}
              className={`${
                active === each_category?.node?.category
                  ? "font-bold border-b-2 border-primary_color"
                  : ""
              } p-4 rounded-lg cursor-pointer shrink-0`}
            >
              {each_category.node.category}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Categories;
