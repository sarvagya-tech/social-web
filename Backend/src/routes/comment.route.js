import { Router } from "express";
import { verifyJwt } from "../middleware/Auth.middleware";
import { createComment, deleteComment, updateComment } from "../controllers/comment.controller";

const commentRouter = Router()

commentRouter
.route("/:blogId").post(verifyJwt,createComment)


commentRouter
.delete("/:commentId",verifyJwt,deleteComment)

commentRouter
.route("/:commentId").patch(verifyJwt,updateComment)