import mongoose,{Schema} from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

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

userSchema.pre(save, async function(next){
    if(!this.isModified(password)) return next;
    this.password = await bcrypt.hash(this.password,10)
    next();
})

userSchema.method.isPasswordCorrect = async function(password){
   await bcrypt.compare(this.password,password)
}

userSchema.method.genrateAccesstoken = jwt.sign(

    {
        _id : this._id,
        fullname : this.fullname,
        email : this.email ,
        username: this.username

    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresin : process.env.ACCESS_TOKEN_EXPIRY
    }

)

userSchema.method.genrateRefreshtoken = jwt.sign(
    {
        _id : this._id
    },

    process.env.REFRESH_TOKEN_SECRET,

    { expireIn : process.env.REFRESH_TOKEN_EXPIRY }
)



export const User = mongoose.model("User",userSchema)

