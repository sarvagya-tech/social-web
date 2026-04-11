import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema({
  

    likedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    likedOn: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
// 🔥 Prevent duplicate likes from same user
likeSchema.index({ likedBy: 1, likedOn: 1 }, { unique: true });

export const Like = mongoose.model("Like", likeSchema);