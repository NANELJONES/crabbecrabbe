"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SimpleBlogPost from "./SimpleBlogPost";

const BlogDerivative = ({ title, blog_data }) => {
  // Slick slider settings
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    variableWidth: true,
  
  };

  return (
    <>
  
      <h5 className="text-lg font-bold mb-4">{title}</h5>
      {blog_data.length === 0 ? <p> {title} Content Upcoming Soon <br/>Stay Tuned</p> : ""}
      {/* Slider for small screens */}
      <div className="block md:hidden">
        <Slider {...sliderSettings}>
          {blog_data.map((each_blog, index) => (
            <div key={index}>
              <SimpleBlogPost blog_post={each_blog} />
            </div>
          ))}
        </Slider>
      </div>

      {/* Block layout for large screens */}
      <div className="hidden   md:w-[100%] md:flex flex-wrap gap-4 mt-2 ">
        {blog_data.map((each_blog, index) => (
          <SimpleBlogPost key={index} blog_post={each_blog} />
        ))}
      </div>
    </>
  );
};

const HorizontalBlogDerivative = ({ title, blog_data }) => {
  // Slick slider settings
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    variableWidth: true,
    
  
  };

  return (
    <>
      <h5 className="text-lg font-bold mb-4">{title}</h5>

      {/* Slider for small screens */}
      <div className="block ">
        <Slider {...sliderSettings}>
          {blog_data.map((each_blog, index) => (
            <div key={index} className="ml-4">
              <SimpleBlogPost blog_post={each_blog} />
            </div>
          ))}
        </Slider>
      </div>

    </>
  );
};


export  {BlogDerivative,HorizontalBlogDerivative };
