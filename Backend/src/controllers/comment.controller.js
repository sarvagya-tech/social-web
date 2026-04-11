import { asynchandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Comment } from "../models/comment.model.js";
import { Blog } from "../models/blog.model.js";

const createComment = asynchandler(async(req,res)=>{
         const {content} = req.body;
         const {blogId} = req.params

         if(!content){
            throw new ApiError(400,"content is required")
         }
         const commentedBy = req.user._id;
         if(!commentedBy){
            throw new ApiError(404,"comment not found ")
         }
         const commentedOn = blogId;
         if(!commentedOn){
            throw new ApiError(404,"comment not found ")
         }
         const blog = await Blog.findById(blogId)

         if(!blog){
            throw new ApiError(404,"blog not found ")
         }

         const comment = await Comment.create({
            content,
            commentedBy : req.user._id,
            commentedOn : blogId
         })

         return res
         .status(200)
         .json(new ApiResponse(200,comment,"commented succesfully "))
})


const deleteComment = asynchandler(async(req,res)=>{
       
   const comment = await Comment.findById(req.params.commentId)

   if(!comment){
      throw new ApiError(404,"comment not found ")
   }

    if (comment.commentedBy.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to delete this comment");
    }

   await Comment.findByIdAndDelete(req.params.commentId)

   return res
   .status(200)
   .json(new ApiResponse(200,{},"deleted successfully"))

})

const updateComment = asynchandler(async(req,res)=>{

   const {content} = req.body;
   if(!content){
     throw new ApiError(404,"comment content is requird ")
   }
       const comment = await Comment.findById(req.params.commentId);

       if(!comment){
         throw new ApiError(404,"comment not found ")
       }

       if(comment.commentedBy.toString()!== req.user._id.toString()){
         throw new ApiError(403,"you are not aurthorized")
       }

       const updatedComment = await Comment.findByIdAndUpdate(req.params.commentId,{
         $set :{
            content
         }
       },
       {
         new : true
       }
       )
       return res
       .status(200)
       .json(new ApiResponse(200,updatedComment,"updated successfully"))

       
})
export {createComment,
   deleteComment,
   updateComment
}