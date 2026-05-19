import React from 'react'
import { useStateContext } from '@/app/Context/StateContext'
import { HorizontalBlogDerivative } from './BlogDerivative'
import { GetSimilarPosts, getFeaturedPost} from '@/app/api/blog';
import { useEffect , useState} from 'react';

const FeaturePosts = () => {

    const {blog,  fetchblog} = useStateContext()
      const [featuredPosts, setFeaturedPosts] = useState([])
      const getFeatured = async () => {  
        try {
          const response = await getFeaturedPost();
          console.log("This is the LASSSSSSSSST FEATURE:", response)
          setFeaturedPosts(response)
          
        } catch (error) {
          console.error("Error fetching featured posts:", error);
          return;
        }
    
    
      }

      useEffect(() => {
    
        if (featuredPosts.length>0)  return

    
        if (featuredPosts.length > 0) {
          return
        }else{
          getFeatured()
        }
    
    
      }, 
    
      
      [blog])

  return (
    <div>
        <div className='mt-[8em]'><HorizontalBlogDerivative title="Featured Posts" blog_data={featuredPosts}/></div>
    </div>
  )
}

export default FeaturePosts
