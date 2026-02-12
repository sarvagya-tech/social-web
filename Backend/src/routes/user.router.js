import {Router} from "express"
import { registerUser } from "../controllers/user.contreoller";
import { upload } from "../middleware/multer.middleware";

const router = Router()

router.route("/register").post(upload.fields([{
   name : "avtar",
   maxCount : 1
}]),
    
    registerUser)

export default router;