import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { asynchandler } from "../utils/asynchandler.js";
import jwt from "jsonwebtoken"

const verifyJwt = asynchandler(async(req,res,next)=>{
    const token = req.cookie?.accessToken || req.header("Authorization")?.replace("Bearer","")

    if(!token){
        throw new ApiError()
    }

const decodedToken =  jwt.verify(token,
    process.env.ACCESS_TOKEN_SECRET
)

const user = await User.findById(decodedToken?._id).select("-password -usernname");

if(!user){
    throw new ApiError()
}

req.user = user;
next();



})
export {verifyJwt};