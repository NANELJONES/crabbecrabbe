"use client";
import React from "react";
import { blog_info } from "@/app/Data/Data";
import Link from "next/link";
import AnimateUp from "../AnimateUp";
import { IoArrowDownCircleOutline } from "react-icons/io5";
import Categories from "./Categories";
import { useStateContext } from "@/app/Context/StateContext";
import FeaturePosts from "./FeaturePosts";

const Blog = () => {
  const { blog, GetDate } = useStateContext();









  




  return (
    <>
   
    <Categories></Categories>
  
    <div className='flex flex-col md:flex-row gap-4 xl:gap-[5em] '>
            <div className=' flex flex-col gap-4 '>
            {blog.data.map((each_blog, index) => {
  return (
    <AnimateUp key={index} delay={Math.min(index * 0.06, 0.36)}>
      <div className="relative px-2 py-2  border-b-2 flex flex-col gap-[1em] md:grid md:grid-cols-3 lg:grid-cols-4 gap-[1em]">
        {/* Cover Image */}
        <div className="w-full md:w-[15em] md:mx-auto col-span-1 h-[15em] md:max-w-[400px] rounded-sm">
          <img src={each_blog?.node?.coverImage?.url} className="w-full h-full object-cover" alt="Blog Cover" />
        </div>

        {/* Title, Author, and Date */}
        <div className="flex flex-col gap-[1em] lg:col-span-2">
          <Link href={`/blog/${each_blog?.node?.slug}`}>
            <h4 className="">{each_blog?.node?.title}</h4>
          
            <span className="flex items-start gap-[5px] w-full">
              {each_blog?.node?.category?.slice(0, 2).map((each_category, index) => (
                <p key={index} className="">#{each_category.category}</p>
              ))}
            </span>
          
          </Link>
          <span className="flex items-center gap-2">
         {/*<img
              src={each_blog?.node?.author?.picture?.url}
              className="w-full h-full max-w-[50px] rounded-full max-h-[50px]"
              alt="Author"
            />*/}   
            {/* <p className="italic ">by: {each_blog?.node?.author?.name}</p> */}
            <p className="italic font-bold "> {GetDate(each_blog?.node?.createdAt)}</p>
          </span>
        </div>

        {/* Excerpt */}
        <div className="flex items-start relative limited-text_normal gap-2">
          <p className=" w-[80%]  ">{each_blog?.node?.excerpt}</p>
          <IoArrowDownCircleOutline className=" absolute bottom-0 right-0 text-primary_color rotate-[-90deg] text-[2em]  " />
         
        </div>
      </div>
    </AnimateUp>
  );
})}

                

            </div>
     
    </div>
    
   <FeaturePosts></FeaturePosts>
    </>
  )
}


const GridBlogLayout = ()=>{

  return <div>
    <div className='flex flex-col-reverse gap-[3em]  lg:flex-row  '>
            <div className=' lg:w-[70%]  flex items-center md:justify-between md:items-start flex-wrap  '>
                {blog_info.data.postsConnection.edges.map((each_blog,index)=>{
                    return <div
                    key={index}
                    className='flex   flex-col w-full md:w-1/2   border-primary_color p-2'
                    > 
                    <img  src={each_blog?.node?.coverImage?.url} className='w-full  rounded-t-xl  w-full'></img>
                    <div className='flex flex-col gap-2  p-4  md:gap-[1em]'>

                    <h5> {each_blog?.node?.title}</h5>
                    <p> {each_blog?.node?.excerpt}</p>
                    <Link href={`/blog/${each_blog?.node?.slug}`}><button className='bg-none  p-2 px-4 text-primary_color border-0 rounded-none border-b-2 border-primary_color'>{'Read More >>>'}</button></Link>
                    <div className='flex fd  items-center gap-4'>
                          <img className='w-10 rounded-full '  src={each_blog?.node?.author?.picture?.url}></img>
                          <p>{each_blog?.node?.author?.name}</p>

                    </div>
                                       
                    <p className='border-l-primary_color'>Posted On: {each_blog?.node?.createdAt}</p>


                    </div>
                   
                    
                    </div>
                })}
                

            </div>
            <div className='w-full border-2 p-4 border-primary_color rounded-lg  md:w-[30%]'>
                <h6> Categories</h6>
            </div>
    </div>

  </div>
}






export default Blog;
export { GridBlogLayout };