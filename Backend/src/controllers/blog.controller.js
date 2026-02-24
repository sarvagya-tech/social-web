import { ApiError } from "../utils/apiError";
import { asynchandler } from "../utils/asynchandler";
import { UploadOnCloudinary } from "../utils/cloudinary";
import {Blog} from "../models/blog.modal"
import { ApiResponse } from "../utils/apiResponse";



const createBlog = asynchandler(async(req,res)=>{

    const {title,content} = req.body;

    if(!title){
           throw new ApiError()
    }
    if(!content){
        throw new ApiError()
    }

    const mediaLocalpath = req.files?.media[0].path;

    if(!mediaLocalpath){
        throw new ApiError()
    }
    const media = await UploadOnCloudinary(mediaLocalpath);

    if(!media){
        throw new ApiError()
    }
    const author =await  req.user._id;

    if(!author){
        throw new ApiError()
    }
    const blog = await Blog.create({
        title,
        content,
        media : media.url,
        author

    })
    return res
    .json(new ApiResponse(200,blog,"blog is created"))

    })


    
    export {createBlog}