import { Like } from "../models/like.model.js";
import { Blog } from "../models/blog.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asynchandler } from "../utils/asynchandler.js";

const toggleLike = asynchandler(async (req, res) => {
  const { blogId } = req.params;

  // 1️⃣ Check blog exists
  const blog = await Blog.findById(blogId);
  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  // 2️⃣ Check if already liked
  const existingLike = await Like.findOne({
    likedBy: req.user._id,
    likedOn: blogId,
  });

  if (existingLike) {
    // Unlike
    await Like.findByIdAndDelete(existingLike._id);

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Blog unliked"));
  }

  // Like
  await Like.create({
    likedBy: req.user._id,
    likedOn: blogId,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, {}, "Blog liked"));
});

export { toggleLike };