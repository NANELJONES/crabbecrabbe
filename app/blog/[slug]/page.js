"use client";
import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import moment from "moment";
import Image from "next/image";
import Layout1 from "@/app/layout/Layout1";
import { blog_info } from "@/app/Data/Data";
import { BlogDerivative, HorizontalBlogDerivative } from "@/app/components/Blog/BlogDerivative";
import ShareSocials from "@/app/components/ShareSocials";
import CommentsForm from "@/app/components/Blog/CommentsForm";
import Comments from "@/app/components/Blog/Comments";
import { GetSingleBlogPost, GetSimilarPosts } from "@/app/api/blog";
import { RichText } from "@graphcms/rich-text-react-renderer";
import FeaturePosts from "@/app/components/Blog/FeaturePosts";


const Page = () => {
  const pathname = usePathname();
  const slug = pathname.split("/").pop();

  const [post, setPost] = useState(null);
  const [similar_post, set_similar_post] = useState([]);
  const [categoryNames, setCategoryNames] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryRef = useRef([]); // Use ref to store previous category state

  console.log("This is the slug:", slug);

  // Fetch blog post data
  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      setLoading(true);
      try {
        const fetchedPost = await GetSingleBlogPost(slug);
        console.log("Fetched Post:", fetchedPost);

        setPost(fetchedPost.post);

        // Extract category names and update state only if they change
        const postCategories = fetchedPost?.post?.category || [];
        const newCategoryNames = postCategories.map((item) => item.category);

        // Only update state if categories are different
        if (JSON.stringify(categoryRef.current) !== JSON.stringify(newCategoryNames)) {
          categoryRef.current = newCategoryNames; // Update ref
          setCategoryNames(newCategoryNames);
        }



      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]); // Runs only when slug changes

  // Fetch similar posts only when categoryNames change
  useEffect(() => {
    if (categoryNames.length === 0 || !slug) return;

    const fetchSimilarPosts = async () => {
      try {
        console.log("Fetching similar posts for categories:", categoryNames);
        const returned_similar_posts = await GetSimilarPosts(categoryNames, slug);
        set_similar_post(returned_similar_posts);
      } catch (error) {
        console.error("Error fetching similar posts:", error);
      }
    };

    fetchSimilarPosts();
  }, [categoryNames]); // Runs only when categories change

  const dateReturner = (timestamp) => moment(timestamp).format("YYYY-MM-DD");

  if (loading || !post) {
    return <div>Loading...</div>;
  }



  const RichTextRenderer = ({ content }) => {
 
    if(content ){
      const fixedHtml = content.replace(/&lt;br\s*\/?&gt;/g, "<br/>");

      return <div dangerouslySetInnerHTML={{ __html: fixedHtml }} />;
    }else {
      return;
    }
  };

  return (
    <Layout1>
      <div className="flex flex-col gap-10 md:flex-row-reverse md:mt-[3em]">
        {/* Main Blog Content */}
        <div className="md:w-[70%] flex flex-col gap-4">
          <h2 className="md:w-[70%]">{post.title}</h2>
          <div className="flex items-center gap-4 flex-wrap">
            {/* <img
              className="w-10 h-10 object-cover border border-2 border-primary-color rounded-full"
              src={post.author?.picture?.url}
              alt={post.author?.name}
            /> */}
            <p className="italic font-bold"> by {post.author?.name}</p>
            <p className="px-2 border-l-8 border-l-primary_color">
              Posted On: {dateReturner(post.createdAt)}
            </p>
          </div>

          <ShareSocials
            shareUrl={`/blog/${post.slug}`}
            shareTitle={post.title}
            shareDescription={post.excerpt}
          />
          <div className="relative w-full max-h-[350px] h-[25em]">
            <Image
              src={post.coverImage?.url}
              fill
              className="object-cover"
              alt={post.title}
            />
          </div>

          <RichText content={post.content.raw}></RichText>


          <br />
          <div className="flex flex-wrap gap-2">
            {post?.category?.map((cat, index) => (
              <p className="text-white bg-primary_color p-4 rounded-lg" key={index}>
                {cat.category}
              </p>
            ))}
          </div>
          <br />
          <Comments slug={slug} />
          <CommentsForm slug={slug} />
        </div>

        {/* Similar Posts */}
        <div className="md:w-[30%]">
          <BlogDerivative title="Similar Posts" blog_data={similar_post} />
        </div>
      </div>

      {/* Featured Posts */}
            <FeaturePosts></FeaturePosts>
    </Layout1>
  );
};

export default Page;
