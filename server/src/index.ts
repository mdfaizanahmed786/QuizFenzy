import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import cookieParser from "cookie-parser"  
import dotenv from "dotenv"
import { Server } from "socket.io"
import http from "node:http"
dotenv.config() 


const app = express()
app.use(cors())
app.use(helmet())
app.use(morgan("dev"))
app.use(cookieParser())



// creating routes





const server=http.createServer(app);
const io = new Server(server, {
// we can pass options here
  });





server.listen(process.env.PORT || 3000,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})





export default app

