import dotenv from 'dotenv'
import connectdb from './db/index.js'
import { app } from './app.js'

dotenv.config({ path: './.env' })


connectdb()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`server running on ${process.env.PORT}`)
    })
}
)
.catch((error)=>{
    console.log("connection failed",error)
    process.exit(1)
    
})
