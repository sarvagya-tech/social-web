import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema(
  
  
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      trim: true,
      default: "",
    },

    excerpt: {
      type: String,
      trim: true,
      default: "",
    },

    content: {
      type: String,
      required: true,
    },

    media: {
      type: String, // image/video URL
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }

    
  },
  {
    timestamps: true,
  }
);

export const Blog = mongoose.model("Blog", blogSchema);
