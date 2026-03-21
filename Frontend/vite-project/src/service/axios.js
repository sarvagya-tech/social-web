import axios from 'axios'

const API = "http://localhost:7000/api/v2"

export const getAllBlogs = async () => {
  const response = await axios.get(`${API}/blog`);
  // Backend returns ApiResponse { statuscode, message: data, data: messageString }
  return response.data?.message ?? [];
};

export const getBlogbyId = async (id) => {
  const response = await axios.get(`${API}/blog/${id}`);
  return response.data?.message ?? null;
};