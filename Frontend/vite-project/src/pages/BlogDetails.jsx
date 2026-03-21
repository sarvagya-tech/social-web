import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import blogPosts from "../data/blogPosts";
import { getBlogbyId } from "../service/axios";

function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBlogdata = async () => {
      try {
        setLoading(true);
        setError(null);

        const blog = await getBlogbyId(id);
        setPost(blog);
      } catch (error) {
        setError("failed to fetch the blog");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBlogdata();
  }, [id]);
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <NavBar />
        <main className="mx-auto flex w-full max-w-4xl flex-col items-center px-4 py-24 text-center sm:px-8">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-400 border-t-transparent" />
          <p className="mt-4 text-slate-300">Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <NavBar />
        <main className="mx-auto flex w-full max-w-4xl flex-col items-center px-4 py-24 text-center sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-400">{error}</p>
          <button onClick={() => navigate("/")} className="mt-8 rounded-full bg-amber-400 px-6 py-3 text-sm font-bold uppercase tracking-[0.1em] text-slate-950 transition hover:bg-amber-300">
            Back To Home
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <NavBar />
        <main className="mx-auto flex w-full max-w-4xl flex-col items-center px-4 py-24 text-center sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
            Blog Not Found
          </p>
          <h1 className="mt-3 text-4xl font-black [font-family:'Playfair_Display',serif]">
            This article does not exist
          </h1>
          <p className="mt-4 max-w-xl text-slate-300">
            The blog may have been removed or the URL might be incorrect.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-8 rounded-full bg-amber-400 px-6 py-3 text-sm font-bold uppercase tracking-[0.1em] text-slate-950 transition hover:bg-amber-300"
          >
            Back To Home
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <NavBar />

      <main className="px-4 pb-20 pt-10 sm:px-8 sm:pt-14">
        <div className="mx-auto w-full max-w-5xl">
          <button
            onClick={() => navigate(-1)}
            className="mb-8 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-100 transition hover:border-amber-300/40 hover:text-amber-200"
          >
            Back
          </button>

          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
            {post.category || "Blog"}
          </p>
          <h1 className="max-w-4xl text-4xl font-black leading-tight [font-family:'Playfair_Display',serif] sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 text-sm uppercase tracking-[0.12em] text-slate-400">
            {post.author?.username || post.author?.fullname || post.author || "Anonymous"} | {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : post.date} | {post.readTime || "5 min read"}
          </p>

          <div className="mt-8 overflow-hidden rounded-[1.8rem] border border-white/10">
            <img
              src={post.media || post.image}
              alt={post.title}
              className="h-[340px] w-full object-cover sm:h-[460px]"
            />
          </div>

          <article className="mt-10 max-w-3xl text-base leading-8 text-slate-200">
            <p>{post.content}</p>
            {post.media && (
              <p className="mt-6 text-sm text-amber-300">
                ✅ This blog post is loaded from your backend API!
              </p>
            )}
            {!post.media && (
              <p className="mt-6 text-slate-400">
                This page is currently using local static data. Connect to your backend to see real blog content.
              </p>
            )}
          </article>

          <section className="mt-14 border-t border-white/10 pt-10">
            <h2 className="text-2xl font-bold [font-family:'Playfair_Display',serif]">
              More stories
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {blogPosts
                .filter((item) => item.id !== post._id && item.id !== post.id)
                .slice(0, 2)
                .map((item) => (
                  <Link
                    key={item.id}
                    to={`/blog/${item.id}`}
                    className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-amber-300/30"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-40 w-full object-cover"
                    />
                    <div className="p-4">
                      <p className="text-xs uppercase tracking-[0.14em] text-amber-300">
                        {item.category}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold text-white">
                        {item.title}
                      </h3>
                    </div>
                  </Link>
                ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default BlogDetails;
