"use client"
import moment from 'moment'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const SimpleBlogPost = ({blog_post}) => {
 

 
 
  return (
    <div className='max-w-[300px] w-full md:min-w-[300px] md:border rounded-lg md:bg-white-200 p-4 flex flex-col  gap-4' >
      <div className='relative w-full h-[14em]'>
        <Image
          src={blog_post?.node?.coverImage?.url}
          alt={blog_post?.node?.title ?? "Blog post cover image"}
          className="w-full object-cover"
          fill
          sizes="(max-width: 768px) 100vw, 300px"
        />
      </div>
      <Link href={ `/blog/${blog_post?.node?.slug}`}>   <h6 className=''>{blog_post.node.title}</h6></Link>
        
        <div className='flex items-center gap-4 flex-wrap '>
                          {/* <img className='w-10 h-10 rounded-full '  src={blog_post?.node?.author?.picture?.url}></img> */}
                    <p className=''>{blog_post?.node?.author?.name}</p>
                        
                    </div>
    </div>
  )
}

export default SimpleBlogPost