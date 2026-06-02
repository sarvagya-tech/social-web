import {asynchandler} from "../utils/asynchandler.js"
import {ApiError} from "../utils/apiError.js"
import { User } from "../models/user.model.js"
import { UploadOnCloudinary } from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/apiResponse.js"



const genrateAccesstkenAndRefreshtoken = async(userId)=>{

try {
        // ❓ Ye function kya karta hai (1 line me)
        // 👉 Given a userId, ye function:
        // user ko DB se nikalta hai
        // access token generate karta hai
        // refresh token generate karta hai
        // refresh token DB me save karta hai
        // dono tokens return karta hai
        
                const user = await User.findById(userId);
        
               const accessToken =  user.generateAccessToken();
               const refreshToken =  user.generateRefreshToken();
        
                user.refreshToken = refreshToken;
        
              await user.save({validateBeforeSave : false})
        
                return {accessToken,refreshToken}
        }
catch (error) {
        throw new ApiError(500,"something went wrong while genrating access and refresh token")
        
}
}

const registerUser = async (req, res) => {
        try {
                const { username, password, email, fullname } = req.body;

                if ([username, fullname, password, email].some((field) => typeof field !== "string" || !field.trim())) {
                        return res.status(400).json({
                                success: false,
                                message: "All fields are required",
                                data: null,
                        });
                }

                const existedUser = await User.findOne({
                        $or: [{ username }, { email }],
                });

                if (existedUser) {
                        return res.status(409).json({
                                success: false,
                                message: "user or email already existed",
                                data: null,
                        });
                }

                const avatarlocalPath = req.files?.avatar?.[0]?.path;

                if (!avatarlocalPath) {
                        return res.status(400).json({
                                success: false,
                                message: "avatar file required",
                                data: null,
                        });
                }

                const avatar = await UploadOnCloudinary(avatarlocalPath);

                if (!avatar) {
                        return res.status(400).json({
                                success: false,
                                message: "avatar upload failed",
                                data: null,
                        });
                }

                const user = await User.create({
                        fullname,
                        avatar: avatar.url,
                        email,
                        password,
                        username: username.toLowerCase(),
                });

                const createdUser = await User.findById(user._id).select("-password -refreshToken");

                if (!createdUser) {
                        return res.status(500).json({
                                success: false,
                                message: "Something went wrong while registering the user",
                                data: null,
                        });
                }

                return res.status(201).json(
                        new ApiResponse(201, createdUser, "user registered successfully")
                );
        } catch (error) {
                return res.status(500).json({
                        success: false,
                        message: error?.message || "Something went wrong while registering the user",
                        data: null,
                });
        }
};

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

        const {accessToken,refreshToken} =
         await genrateAccesstkenAndRefreshtoken(user._id);

        
        const loggedInuser = await User.findById(user._id).select("-password -refreshToken")

        const options = {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
        };

        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
                new ApiResponse(
                        200,
                        {
                         user : loggedInuser, accessToken, refreshToken
                        },
                        "user logged in "
                )
        );
    })

     const logOutUser = asynchandler(async (req,res) => {
       await User.findByIdAndUpdate(req.user._id,
        {
                $unset :{
                           refreshToken : 1
                }
        },{
                new : true
        }
        );

        const options = {
                httpOnly : true,
                secure : true
        }

        return res
        .status(200)
        .clearcookie("accesToken",options)
        .clearcookie("refeshToken",options)
        .json(new ApiResponse(200,{},"user logged out"))

     });
export {registerUser,
        loginUser
};
