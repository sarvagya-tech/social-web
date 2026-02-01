import mongoose from "mongoose";
import {DB_NAME} from "../constrants.js"


const connectdb = async () => {

try {
    
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
    
    console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    
} catch (error) {
    console.log("db connection failed",error)
    
}
}

export default connectdb