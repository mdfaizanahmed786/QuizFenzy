import { clerkClient } from "@clerk/clerk-sdk-node";
import { Request, Response } from "express"
import client from "../utils/client";


const getQuizzes = async (req: Request, res: Response) => {
    const user=req;
    const userId=user.auth.userId;
    try {
        const quizzes=await client.quiz.findMany({
            where:{
               creatorId:userId
            }
        })
        res.status(200).json({
            message:"Quizzes fetched successfully",
            data:quizzes
        })
    
        
    } catch (error) {
        console.log(error, "ERROR while fetching quizzes")
        res.status(500).json({ error: "Internal server error" });
        return;
    }
}


const createQuiz = async (req: Request, res: Response) => {
    try {

        
    } catch (error) {

    }

}




export { getQuizzes, createQuiz }