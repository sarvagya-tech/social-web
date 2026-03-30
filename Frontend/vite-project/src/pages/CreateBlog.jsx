import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { createBlogPost } from '../service/axios';

const DRAFT_KEY = 'create-blog-draft';

const initialFormState = {
  title: '',
  category: '',
  excerpt: '',
  content: '',
};

const CreateBlog = () => {
  const navigate = useNavigate();
  const imageInputRef = useRef(null);
  const [formValues, setFormValues] = useState(initialFormState);
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [lastSavedAt, setLastSavedAt] = useState('');

  useEffect(() => {
    const rawDraft = localStorage.getItem(DRAFT_KEY);
    if (!rawDraft) return;

    try {
      const parsedDraft = JSON.parse(rawDraft);
      setFormValues({
        title: parsedDraft.title || '',
        category: parsedDraft.category || '',
        excerpt: parsedDraft.excerpt || '',
        content: parsedDraft.content || '',
      });
      setLastSavedAt(parsedDraft.savedAt || '');
      setSuccessMessage('Draft loaded from local storage.');
    } catch {
      localStorage.removeItem(DRAFT_KEY);
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setFormError('');
    setSuccessMessage('');
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      setImageFile(null);
      setFormError('');
      setSuccessMessage('');
      return;
    }

    if (!file.type.startsWith('image/')) {
      setFormError('Please upload a valid image file.');
      setImageFile(null);
      event.target.value = '';
      return;
    }

    const maxSizeInBytes = 5 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      setFormError('Image size must be 5MB or less.');
      setImageFile(null);
      event.target.value = '';
      return;
    }

    setImageFile(file);
    setFormError('');
    setSuccessMessage('');
  };

  const resolveAuthToken = () =>
    localStorage.getItem('accessToken') ||
    localStorage.getItem('token') ||
    localStorage.getItem('authToken') ||
    sessionStorage.getItem('accessToken') ||
    '';

  const validateForm = () => {
    if (!formValues.title.trim()) return 'Blog title is required.';
    if (!formValues.content.trim()) return 'Blog content is required.';
    if (!imageFile) return 'Featured image is required.';
    return '';
  };

  const handleSaveDraft = () => {
    const savedAt = new Date().toISOString();

    localStorage.setItem(
      DRAFT_KEY,
      JSON.stringify({
        ...formValues,
        savedAt,
      }),
    );

    setLastSavedAt(savedAt);
    setSuccessMessage('Draft saved locally.');
    setFormError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError('');
    setSuccessMessage('');

    const validationError = validateForm();
    if (validationError) {
      setFormError(validationError);
      return;
    }

    const token = resolveAuthToken();
    if (!token) {
      setFormError('Please log in before publishing a blog.');
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = new FormData();
      payload.append('title', formValues.title.trim());
      payload.append('content', formValues.content.trim());
      payload.append('media', imageFile);

      const createdBlog = await createBlogPost(payload, token);
      const blogId = createdBlog?._id || createdBlog?.id;

      localStorage.removeItem(DRAFT_KEY);
      setFormValues(initialFormState);
      setImageFile(null);
      setLastSavedAt('');
      if (imageInputRef.current) {
        imageInputRef.current.value = '';
      }

      setSuccessMessage('Blog published successfully.');

      if (blogId) {
        navigate(`/blog/${blogId}`);
        return;
      }

      navigate('/blog');
    } catch (error) {
      const apiMessage =
        error?.response?.data?.data ||
        error?.response?.data?.message ||
        'Failed to publish blog. Please check your login and try again.';
      setFormError(
        typeof apiMessage === 'string'
          ? apiMessage
          : 'Failed to publish blog. Please check your login and try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedImageLabel = imageFile
    ? `${imageFile.name} (${(imageFile.size / (1024 * 1024)).toFixed(2)} MB)`
    : 'Click to upload an image';

  const wordCount = formValues.content.trim()
    ? formValues.content.trim().split(/\s+/).length
    : 0;

  return (
    <>
      <NavBar />
      <div className="relative min-h-screen bg-slate-950 px-4 py-12 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-32 h-80 w-80 rounded-full bg-cyan-400/5 blur-3xl" />

        <div className="relative mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
              Share Your Ideas
            </p>
            <h1 className="text-4xl font-black leading-tight text-white [font-family:'Playfair_Display',serif] sm:text-5xl">
              Create Your Blog Post
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-300">
              Share your thoughts, stories, and insights with our community.
              Write, create, and inspire.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-sm sm:p-10"
          >
            {formError ? (
              <div className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-100">
                {formError}
              </div>
            ) : null}

            {successMessage ? (
              <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
                {successMessage}
              </div>
            ) : null}

            <div>
              <label
                htmlFor="title"
                className="mb-3 block text-sm font-semibold uppercase tracking-[0.12em] text-amber-100"
              >
                Blog Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formValues.title}
                onChange={handleChange}
                placeholder="Enter an engaging title for your blog..."
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-400 transition focus:border-amber-300/50 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="mb-3 block text-sm font-semibold uppercase tracking-[0.12em] text-amber-100"
              >
                Category
              </label>
              <input
                id="category"
                name="category"
                type="text"
                value={formValues.category}
                onChange={handleChange}
                placeholder="e.g., Technology, Design, Productivity..."
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-400 transition focus:border-amber-300/50 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
              />
            </div>

            <div>
              <label
                htmlFor="excerpt"
                className="mb-3 block text-sm font-semibold uppercase tracking-[0.12em] text-amber-100"
              >
                Excerpt
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                rows="3"
                value={formValues.excerpt}
                onChange={handleChange}
                placeholder="Write a brief summary of your blog post..."
                className="w-full resize-vertical rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-400 transition focus:border-amber-300/50 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
              />
            </div>

            <div>
              <label
                htmlFor="content"
                className="mb-3 block text-sm font-semibold uppercase tracking-[0.12em] text-amber-100"
              >
                Content
              </label>
              <textarea
                id="content"
                name="content"
                rows="12"
                value={formValues.content}
                onChange={handleChange}
                placeholder="Write your full blog content here. Feel free to express your ideas..."
                className="w-full resize-vertical rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-400 transition focus:border-amber-300/50 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
              />
              <p className="mt-2 text-xs text-slate-400">
                {wordCount
                  ? `${wordCount} words in your draft`
                  : 'Start writing to see your word count.'}
              </p>
            </div>

            <div>
              <label
                htmlFor="image"
                className="mb-3 block text-sm font-semibold uppercase tracking-[0.12em] text-amber-100"
              >
                Featured Image
              </label>
              <div className="rounded-2xl border border-dashed border-white/20 bg-white/5 p-6 text-center transition hover:border-amber-300/40 hover:bg-white/10">
                <input
                  ref={imageInputRef}
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label htmlFor="image" className="cursor-pointer">
                  <div className="space-y-2">
                    <div className="text-2xl text-amber-200">Upload</div>
                    <p className="text-sm font-medium text-slate-300">
                      {selectedImageLabel}
                    </p>
                    <p className="text-xs text-slate-400">
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </div>
                </label>
              </div>
            </div>

            <div className="flex gap-4 pt-4 sm:justify-end">
              <button
                type="button"
                onClick={handleSaveDraft}
                disabled={isSubmitting}
                className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:border-white/40 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Save Draft
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full bg-gradient-to-r from-amber-400 to-amber-300 px-8 py-3 text-sm font-bold uppercase tracking-[0.12em] text-slate-950 transition hover:shadow-lg hover:shadow-amber-400/30 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? 'Publishing...' : 'Publish Blog'}
              </button>
            </div>

            {lastSavedAt ? (
              <p className="text-xs text-slate-400">
                Last draft saved on {new Date(lastSavedAt).toLocaleString()}
              </p>
            ) : null}
          </form>

          <div className="mt-12 rounded-2xl border border-amber-300/20 bg-amber-400/10 p-6">
            <p className="text-sm leading-7 text-amber-50">
              <span className="font-semibold">Tip:</span> Write engaging titles
              that capture attention, use clear excerpts to hook readers, and
              structure your content with proper paragraphs for better
              readability.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateBlog;
