import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import cookieParser from "cookie-parser"  
import dotenv from "dotenv"
import { Server } from "socket.io"
import http from "node:http"
import userRoute from "./routes/user.rotue"
import quizRoute from "./routes/quiz.route"
import questionRoute from "./routes/question.router"
import answerRoute from "./routes/answer.route"

dotenv.config() 


const app = express()
app.use(cors())
app.use(express.json())
app.use(helmet())
app.use(morgan("dev"))
app.use(cookieParser())



// creating routes

app.use("/api/v1/user", userRoute)
app.use("/api/v1/quiz", quizRoute)
app.use("/api/v1/question", questionRoute)
app.use("/api/v1/answer", answerRoute)





const server=http.createServer(app);
const io = new Server(server, {
// we can pass options here
  });





server.listen(process.env.PORT || 3000,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})





export default app

