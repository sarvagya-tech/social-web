import { ApiError } from "../utils/apiError.js";
import { asynchandler } from "../utils/asynchandler.js";
import { UploadOnCloudinary } from "../utils/cloudinary.js";
import {Blog} from "../models/blog.modal.js"
import { ApiResponse } from "../utils/apiResponse.js";



const createBlog = asynchandler(async(req,res)=>{

    const {title,content} = req.body;

    if(!title){
           throw new ApiError()
    }
    if(!content){
        throw new ApiError()
    }

    const mediaLocalpath = req.files?.media?.[0]?.path;

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


    const getallBlog = asynchandler(async (req,res)=>{

        const blogs = await Blog.find()
        .populate("author","username fullname")
        .sort({createdAt : -1});

        if(!blogs){
            throw new ApiError(404, "No blogs found")
        }

        return res
        .status(200)
        .json(new ApiResponse(200,blogs,"all blogs fetched successfully"))

    });


    const getsingleBlog = asynchandler(async (req,res)=>
        {
        console.log("Requested blog ID:", req.params.id);

        const singleblog = await Blog.findById(req.params.id)
        .populate("author","username fullname")

        console.log("Found blog:", singleblog);

        if(!singleblog){
            throw new ApiError(404, "Blog not found")
        }

        return res
    .status(200)
    .json(new ApiResponse(200,singleblog,"blog fetched successfully"))



    });


    const updateBlog = asynchandler(async (req,res)=>{

        const {title,content} = req.body;
         if (!title && !content) {
          throw new ApiError(400, "At least one field is required to update");
    }

        const updateblog  = await Blog.findByIdAndUpdate(
            req.params.id,{
            $set : {
                     title,
                     content
            }
            },
            {
                new : true
            }
        )
        return res 
        .status(200)
        .json(new ApiResponse(200,updateblog,"updated blog"))

    })


    const deleteBlog = asynchandler(async(req,res)=>{

        const blog = await Blog.findById(req.params.id);

        if(!blog){
            throw new ApiError()
        }

        if(blog.author.toString() !== req.user._id.toString()){
            throw new ApiError()
        }

       await Blog.findByIdAndDelete(req.params.id);


        return res
        .status(200)
        .json(new ApiResponse(200,{},"successfully deleted"));

    })
    

    export {createBlog,
        getallBlog,
        getsingleBlog,
        deleteBlog,
        updateBlog
    }