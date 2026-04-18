import {Router} from "express"
import { loginUser, registerUser } from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJwt } from "../middleware/Auth.middleware.js";

const userRouter = Router()

userRouter.route("/register").post(upload.fields([{
   name : "avatar",
   maxCount : 1
}]),
    
    registerUser)
userRouter.post("/login",loginUser)

userRouter.get("/me",verifyJwt,(req,res)=>{
    res.json({
        user : req.user
    });
});
export default userRouter;

//sarvagya mishra from lucknow jnp