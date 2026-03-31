import React, { useState } from 'react';
import NavBar from '../components/NavBar';

const CreateBlog = () => {

  const[title,setTitle] = useState('');
  const[category,setCategory] = useState('');
  const[content,setContent] = useState('');
  const[image,setImage] = useState(null);
  const[excerpt,setExcerpt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async(e)=>{
     
    e.preventDefault();
    setError("");
    setSuccess("");

    if(!title.trim()|| !content.trim()){
      setError("Title and content are required.")
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title",title);
      formData.append("category",category);
      formData.append("content",content);
      formData.append("excerpt",excerpt);
      if(image)formData.append("image",image);

      // this down written code is for sending the content to the server//
           
      const response = await fetch("http://localhost:7000/api/v2/blog",{
        method : "POST",
        body : formData,
      });

      const data = await response.json();
      if(!response.ok) throw new Error(data.message || "Create failed")
      
        setSuccess("Blog published successfully!");
        setTitle('');
        setCategory('');
        setContent('');
        setExcerpt('');
        setImage(null);
    } catch (error) {
      setError(error.message|| "Something went wrong.");

      
      
    } finally {
      setLoading(false);
    }
  

  }
  
  return (

    
    <>
      <NavBar />
      <div className="relative min-h-screen bg-slate-950 px-4 py-12 sm:px-6 lg:px-8">
        {/* Background gradient effects */}
        <div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-32 h-80 w-80 rounded-full bg-cyan-400/5 blur-3xl" />

        <div className="relative mx-auto max-w-4xl">
          {/* Header Section */}
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
              Share Your Ideas
            </p>
            <h1 className="text-4xl font-black leading-tight text-white [font-family:'Playfair_Display',serif] sm:text-5xl">
              Create Your Blog Post
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-300">
              Share your thoughts, stories, and insights with our community. Write, create, and inspire.
            </p>
          </div>

          {/* Form Container */}
          <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm shadow-2xl sm:p-10">
            
            {/* Title Input */}
            <div>
              <label htmlFor="title" className="mb-3 block text-sm font-semibold uppercase tracking-[0.12em] text-amber-100">
                Blog Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                placeholder="Enter an engaging title for your blog..."
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-400 transition focus:border-amber-300/50 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
              />
            </div>

            {/* Category Input */}
            <div>
              <label htmlFor="category" className="mb-3 block text-sm font-semibold uppercase tracking-[0.12em] text-amber-100">
                Category
              </label>
              <input
                id="category"
                name="category"
                type="text"
                value={category}
                onChange={(e)=>setCategory(e.target.value)}
                placeholder="e.g., Technology, Design, Productivity..."
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-400 transition focus:border-amber-300/50 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
              />
            </div>

            {/* Excerpt Input */}
            <div>
              <label htmlFor="excerpt" className="mb-3 block text-sm font-semibold uppercase tracking-[0.12em] text-amber-100">
                Excerpt
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                rows="3"
                value={excerpt}
                onChange={(e)=>setExcerpt(e.target.value)}
                placeholder="Write a brief summary of your blog post..."
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-400 resize-vertical transition focus:border-amber-300/50 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
              />
            </div>

            {/* Content Input */}
            <div>
              <label htmlFor="content" className="mb-3 block text-sm font-semibold uppercase tracking-[0.12em] text-amber-100">
                Content
              </label>
              <textarea
                id="content"
                name="content"
                rows="12"
                value={content}
                onChange={(e)=>setContent(e.target.value)}
                placeholder="Write your full blog content here. Feel free to express your ideas..."
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-400 resize-vertical transition focus:border-amber-300/50 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label htmlFor="image" className="mb-3 block text-sm font-semibold uppercase tracking-[0.12em] text-amber-100">
                Featured Image
              </label>
              <div className="rounded-2xl border border-dashed border-white/20 bg-white/5 p-6 text-center transition hover:border-amber-300/40 hover:bg-white/10">
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={(e)=>setImage(e.target.files?.[0]?? null)}
                  className="hidden"
                />
                <label htmlFor="image" className="cursor-pointer">
                  <div className="space-y-2">
                    <div className="text-2xl">📸</div>
                    <p className="text-sm font-medium text-slate-300">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-slate-400">PNG, JPG, GIF up to 5MB</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4 sm:justify-end">
              {error && <p className="text-red-400 text-sm">{error}</p>}
              {success && <p className="text-green-400 text-sm">{success}</p>}
              <button
                type="button"
                className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:border-white/40 hover:bg-white/10"
              >
                Save Draft
              </button>
              <button
                type="submit"
                disabled={loading}
                className="rounded-full bg-gradient-to-r from-amber-400 to-amber-300 px-8 py-3 text-sm font-bold uppercase tracking-[0.12em] text-slate-950 transition hover:shadow-lg hover:shadow-amber-400/30"
              />
                {loading ? "Publishing..." : "Publish Blog"}
            </div>

          </form>

          {/* Info Box */}
          <div className="mt-12 rounded-2xl border border-amber-300/20 bg-amber-400/10 p-6">
            <p className="text-sm leading-7 text-amber-50">
              <span className="font-semibold">💡 Tip:</span> Write engaging titles that capture attention, use clear excerpts to hook readers, and structure your content with proper paragraphs for better readability.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateBlog;