import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogCard from "./BlogCard";
import blogPosts from "../data/blogPosts";
import { getAllBlogs } from "../service/axios";

function BlogList() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        setLoadError("");
        const blogs = await getAllBlogs();
        setPosts(Array.isArray(blogs) ? blogs : []);
      } catch {
        setLoadError("Unable to load blogs from the API right now.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const postsToRender = loadError ? blogPosts : posts;
  const displayedPosts = postsToRender.slice(0, 8);
  const hasMorePosts = postsToRender.length > 8;

  const handleViewMore = () => {
    navigate('/blog');
  };

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
            {loadError
              ? "Showing local sample posts because the live blog API could not be reached."
              : "This section now pulls published blogs from your backend API."}
          </p>
        </div>

        {isLoading ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-12 text-center text-slate-300">
            Loading blog posts...
          </div>
        ) : null}

        {!isLoading && !postsToRender.length ? (
          <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 px-6 py-12 text-center">
            <p className="text-lg font-semibold text-white">
              No blogs published yet.
            </p>
            <p className="mt-2 text-sm text-slate-300">
              Publish your first post from the create blog page and it will
              appear here.
            </p>
          </div>
        ) : null}

        {!isLoading && postsToRender.length ? (
          <>
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {displayedPosts.map((post) => (
                <BlogCard key={post._id || post.id} post={post} />
              ))}
            </div>
            {hasMorePosts && (
              <div className="mt-12 text-center">
                <button
                  onClick={handleViewMore}
                  className="rounded-full bg-amber-400 px-8 py-3 text-sm font-bold uppercase tracking-[0.12em] text-slate-950 transition hover:bg-amber-300"
                >
                  View More Articles
                </button>
              </div>
            )}
          </>
        ) : null}
      </div>
      
    </section>
  );
}

export default BlogList;
