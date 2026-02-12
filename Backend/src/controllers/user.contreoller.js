import {asynchandler} from "../utils/asynchandler.js"




const registerUser = asynchandler((req,res)=>{
    
        res.status(200).json({message : hello});
    
})


export {registerUser};