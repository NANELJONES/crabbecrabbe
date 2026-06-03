"use client"
import React from "react";
import Link from "next/link";
import AnimateUp from './AnimateUp'
import ButtonLink from "./ButtonLink";
import { useStateContext } from '../Context/StateContext'
import { IoArrowDownCircleOutline } from "react-icons/io5";
import Layout1 from "../layout/Layout1";



const BlogSample = () => {



  const { blog, GetDate } = useStateContext();

  return (
    <>
       <Layout1>
       <div className=' w-full flex flex-col gap-[2em]'>
        <h1 className='text-primary_color'>Exclusive Updates</h1>
        <h6 className='text-secondary_color'>Recent Posts</h6>
        <div className='  flex flex-col gap-[1em] md:flex-row justify-between '>
      
             
      
    
                    <div className='md:w-full   flex flex-col items-start gap-4'>
                                
                    {blog.data.slice(0,4).map((each_blog,index)=>{
                            return  <AnimateUp key={index} delay={index * 0.08}>
                        <div className='relative px-2 py-2 border-b-2 flex flex-col   md:grid grid-cols-5 gap-[1em]  md:gap-[1em]  ' >

                          {/* this is the cover image */}
                          <div className='w  md:mx-auto col-span-1 h-[15em] max-w-[400px] max-h-[400px]  max-w-[400px] rounded-sm '>
                            <img src={each_blog?.node?.coverImage?.url}  className='w-full h-full object-cover   '></img>
                          </div>

                          {/* this is the title and the author and the date */}
                         <div className='col-span-2 flex flex-col gap-2 ' >
                         <Link href={`/blog/${each_blog?.node?.slug}`} className='' > 
                          
                          <h4 className='text-secondary_color'>{each_blog?.node?.title} 
                            
                            </h4> 
                     
                        <span className='flex items-start  gap-[5px] w-full'>
                        {each_blog?.node?.category?.slice(0,2).map((each_category,index)=>{
                            return <p key={index} className='text-secondary_color '> #{each_category.category}</p>
                          })}
                        </span>
                  

                          </Link> 
                           <span className='flex items-center gap-2 '>
                           {each_blog?.node?.author?.picture?.url ?         <img src={each_blog?.node?.author?.picture?.url}  alt="man" className='w-full h-full  max-w-[50px] rounded-full max-h-[50px]'></img>
                                : ""}  
                                
                        
                                <p className='italic text-secondary_color'>by:  {each_blog.node?.author?.name}</p>
                                <p className='italic  ml-[2em] text-secondary_color'>{ GetDate(each_blog.node?.createdAt)}</p>
                                
                           </span>

                         </div>

                         {/* excerty */}

                         <div className='flex justify-between  col-span-2 gap-2'>
                          <p className='text-secondary_color w-[85%] limited-text_normal'>{each_blog?.node?.excerpt}</p>
                        <IoArrowDownCircleOutline
                        className='text-[2em] rotate-[-90deg] text-secondary_color'
                        ></IoArrowDownCircleOutline>
                         </div>
                           
                     
                
                    
                    
                    </div>
                    
                    
                    </AnimateUp>
                        })}
                        

                     <AnimateUp>
                       <ButtonLink href="/blog">Explore More</ButtonLink>
                     </AnimateUp>
                      
                    </div>
                    

        </div>
        

    
    </div>
       </Layout1>
    </>

  )
}

export default BlogSample