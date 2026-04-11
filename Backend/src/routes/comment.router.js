import { Router } from "express";
import { verifyJwt } from "../middleware/Auth.middleware.js";
import { createComment, deleteComment, updateComment } from "../controllers/comment.controller.js";

const commentRouter = Router()

commentRouter
.route("/:blogId").post(verifyJwt,createComment)


commentRouter
.delete("/:commentId",verifyJwt,deleteComment)

commentRouter
.route("/:commentId").patch(verifyJwt,updateComment)

export {commentRouter}