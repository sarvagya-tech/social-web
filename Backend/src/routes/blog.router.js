import { Router } from "express";
import { createBlog, deleteBlog, getallBlog, getsingleBlog, updateBlog } from "../controllers/blog.controller.js";
import { verifyJwt } from "../middleware/Auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const blogRouter = Router()

blogRouter
.route("/")
.get(getallBlog)
.post(verifyJwt,
    upload.fields([{
        name : "media",
        maxCount: 1

    }]),
    createBlog
);

blogRouter.route("/:id").get(getsingleBlog)

blogRouter.route("/:id").patch(verifyJwt,updateBlog)


blogRouter.delete("/:id",verifyJwt,deleteBlog)

export {blogRouter}