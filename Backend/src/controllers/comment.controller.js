import { asynchandler } from "../utils/asynchandler";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import { Comment } from "../models/comment.modal";

const createComment = asynchandler((req,res)=>{
         const {content} = req.body;

         if(!content){
            throw new ApiError()
         }
         const commentedBy = req.user._id;
         if(!commentedBy){
            throw new ApiError()
         }
         const commentedOn = req.blog._id;
         if(!commentedOn){
            throw new ApiError()
         }

         const comment = Comment.create({
            content,
            commentedBy,
            commentedOn
         })
})
export {createComment}