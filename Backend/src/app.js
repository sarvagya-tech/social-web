import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"


const app = express()


const allowedOrigins = [
  process.env.CORS_ORIGIN,
  process.env.CLIENT_URL,
  process.env.cors_origin,
  process.env.client_url
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins.length ? allowedOrigins : 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


import userRouter from "./routes/user.router.js"

app.use("/api/v2/users",userRouter)


import { blogRouter } from "./routes/blog.router.js"

app.use("/api/v2/blog",blogRouter)


import { commentRouter } from "./routes/comment.router.js"
app.use("/api/v2/comment",commentRouter)

app.get("/test",(req,res)=>{
   res.send("API working")
})


app.use((req,res)=>{
  res.status(404).json({
    message:"Route not found"
  })
})







export {app}
