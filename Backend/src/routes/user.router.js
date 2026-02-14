import {Router} from "express"
import { registerUser } from "../controllers/user.contreoller.js";
import { upload } from "../middleware/multer.middleware.js";

const userRouter = Router()

userRouter.route("/register").post(upload.fields([{
   name : "avtar",
   maxCount : 1
}]),
    
    registerUser)

export default userRouter;