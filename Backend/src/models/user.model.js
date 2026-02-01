import mongoose,{Schema} from "mongoose"

const userSchema = new Schema({
    username :{
        required : true,
        type : String,
        unique : true,
        lowercase : true ,
        trim : true ,
        index : true 
    },
    email:{
         type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true,
    },
    password:{
        type : string ,
        required : [true," password is required"]
    },
    fullname:{
         type: String,
            required: true,
            trim: true, 
            index: true
    },
    avtar:{
        type : string ,
        required : true 
    },
    coverImage:{
        type : string 
    },
    refreshToken:{
        type : string 
    }
},{timestamps: true})


export const User = mongoose.model("User",userSchema)

