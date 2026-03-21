import BlogCard from "./BlogCard";
import blogPosts from "../data/blogPosts";
import { useEffect, useState } from "react";
import { getAllBlogs } from "../service/axios";

function BlogList() {
  


  return (
    <section className="px-4 py-16 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
              Featured Stories
            </p>
            <h2 className="text-4xl font-black leading-tight text-white [font-family:'Playfair_Display',serif] sm:text-5xl">
              Articles crafted for curious readers
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-slate-300">
            Layout only. Data is currently static and mapped so you can replace
            it with API data later.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BlogList;
