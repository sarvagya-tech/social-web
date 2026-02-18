import { ApiError } from "../utils/apiError";
import { asynchandler } from "../utils/asynchandler";
import jwt from "jsonwebtoken"

const verifyJwt = asynchandler(async(req,res,next)=>{
    const token = req.cookie?.accessToken || req.header("Authorization")?.replace("Bearer","")

    if(!token){
        throw new ApiError()
    }

const decodedToken = jwt.verify(token,
    process.env.accessToken
)


})