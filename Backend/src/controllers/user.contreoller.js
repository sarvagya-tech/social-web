import {asynchandler} from "../utils/asynchandler.js"
import {ApiError} from "../utils/apiError.js"
import { User } from "../models/user.model.js"
import { UploadOnCloudinary } from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/apiResponse.js"




const registerUser = asynchandler(async (req,res)=>{
    
        // res.status(200).json({message : hello});

        const{username,password,email,fullname} = req.body

        if(username.trim()==""){
                throw new ApiError(400,"required")
                
        }
         if(fullname.trim()==""){
                throw new ApiError(400,"required")
                
        }
         if(password.trim()==""){
                throw new ApiError(400,"required")
                
        }
         if(email.trim()==""){
                throw new ApiError(400,"required")
                
        }

        const existedUser = await User.findOne({
                $or : [{username},{email}]

})

if(existedUser){
        throw new ApiError(409,"user or email alredy existed");
}

const  avatarlocalPath = req.file?.avatar[0]?.Path;

if(!avatarlocalPath){
        throw new ApiError(400,"avtar file required");
}

const avatar = await UploadOnCloudinary(avatarlocalPath);

if(!avtar){
        throw new ApiError(400,"avtar is required");
}


const user = await User.create({
        fullname,
        avatar : avatar.url,
        email,
        password,
        username : username.toLowerCase()
})

const createdUser = User.findById(user._id).select(
       " -password -refreshToken"
)

  if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
         new ApiResponse(200,createdUser,"register of user succesfull")
    )





    
})


export {registerUser};