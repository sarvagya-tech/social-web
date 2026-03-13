import {Router} from "express"
import { loginUser, registerUser } from "../controllers/user.contreoller.js";
import { upload } from "../middleware/multer.middleware.js";

const userRouter = Router()

userRouter.route("/register").post(upload.fields([{
   name : "avatar",
   maxCount : 1
}]),
    
    registerUser)
userRouter.post("/login",loginUser)
export default userRouter;