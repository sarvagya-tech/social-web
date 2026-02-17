import {asynchandler} from "../utils/asynchandler.js"
import {ApiError} from "../utils/apiError.js"
import { User } from "../models/user.model.js"
import { UploadOnCloudinary } from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/apiResponse.js"



const genrateAccesstkenAndRefreshtoken = (userId)=>{

try {
        // ❓ Ye function kya karta hai (1 line me)
        // 👉 Given a userId, ye function:
        // user ko DB se nikalta hai
        // access token generate karta hai
        // refresh token generate karta hai
        // refresh token DB me save karta hai
        // dono tokens return karta hai
        
                const user = User.findById(userId);
        
               const accessToken =  user.generateAccessToken();
               const refreshToken =  user.generateRefreshToken();
        
                user.refreshToken = refreshToken;
        
                user.save({validateBeforeSave : false})
        
                return {accessToken,refreshToken}
        }
catch (error) {
        throw new ApiError(500,"something went wrong while genrating access and refresh token")
        
}
}

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

 // req body -> data
    // username or email
    //find the user
    //password check
    //access and referesh token
    //send cookie

    const loginUser = asynchandler(async(req,res)=>{

        const {email,username,password} = req.body;
        
        if(!username && !email){
                throw new ApiError()
        }

        const user = await User.findOne({
                $or : [{username},{email}]
        })

        if(!user){
                throw new ApiError();
        }

        const ispasswordValid = await user.isPasswordCorrect(password);

        if(!ispasswordValid){
                throw new ApiError();
        }

        const {accessToken,refreshToken} = genrateAccesstkenAndRefreshtoken(user._id);

        const options = {
                httpOnly : true,
                secure : true

        }

        return res
        .status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",refreshToken,options)
        .json(
                new ApiResponse(
                        200,
                        {
                         user : loginUser,accessToken,refreshToken
                        },
                        "user logged in "
                )
        )
    })


export {registerUser,
        loginUser
};