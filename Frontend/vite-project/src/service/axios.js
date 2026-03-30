import axios from 'axios';

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:7000/api/v2';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const getAllBlogs = async () => {
  const response = await apiClient.get('/blog/blogs');
  return response.data?.message ?? [];
};

export const getBlogById = async (id) => {
  const response = await apiClient.get(`/blog/${id}`);
  return response.data?.message ?? null;
};

export const createBlogPost = async (payload, token) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const response = await apiClient.post('/blog/create', payload, { headers });
  return response.data?.message ?? null;
};
