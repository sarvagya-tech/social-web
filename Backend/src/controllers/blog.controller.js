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


    const getallBlog = asynchandler((req,res)=>{

        const blogs = Blog.find()
        .populate(author,"username fullname")
        .sort({createdAt : -1});

        if(!blogs){
            throw new ApiError()
        }

        return res
        .status()
        .json(new ApiResponse(200,blogs,"all blogs "))

    });


    const getsingleBlog = asynchandler((req,res)=>
        {
        const singleblog = Blog.findById(req.param._id)
        .populate(author,"username fullname")

        if(!singleblog){
            throw new ApiError()
        }

        return res
    .status(200)
    .json(new ApiResponse(200,singleblog,"this is the single blog "))



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