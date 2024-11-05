import { Request, Response } from "express";
import client from "../utils/client";
import { quizSchema } from "../validation/validation";


const getQuizzes = async (req: Request, res: Response) => {
    const user = req;
    const userId = user.auth.userId;
    try {
        const quizzes = await client.quiz.findMany({
            where: {
                creatorId: userId
            }
        })
        res.status(200).json({
            message: "Quizzes fetched successfully",
            data: quizzes,
            success: true
        })


    } catch (error) {
        console.log(error, "ERROR while fetching quizzes")
        res.status(500).json({ error: "Internal server error", success:false });
        return;
    }
}


const createQuiz = async (req: Request, res: Response) => {
    const user = req;
    const userId = user.auth.userId;
    const quizBody = req.body;
    const parsedQuizBody = quizSchema.safeParse(quizBody);
    try {
        if (!parsedQuizBody.success) {
            res.status(400).json({ error: parsedQuizBody.error, success:false });
            return;
        }
        const quiz = parsedQuizBody.data;
        const newQuiz = await client.quiz.create({
            data: {
                quizTitle: quiz.quizTitle,
                creatorId: userId
            }
        })

        if (!newQuiz) {
            res.status(500).json({ error: "Error while creating quiz", success:false });
            return;
        }


        const newQuestion = await client.question.create({
            data: {
                questionTitle: "Your question",
                quizId: newQuiz.id
            }
        })


        if (!newQuestion) {
            res.status(500).json({ error: "Error while creating question", success:false });
            return;
        }

        const newAnswer = await client.answer.create({
            data: {
                text: "Your answer",
                questionId: newQuestion.id,
                isCorrect: false
            }
        })

        res.status(201).json({
            message: "Quiz created successfully",
            data: {
                quiz: newQuiz,
                question: newQuestion,
                answer: newAnswer
            },
            success:true
        })
        return;



    } catch (error) {
        console.log(error, "ERROR while creating quiz")
        res.status(500).json({ error: "Internal server error", success:false });
        return
    }

}



const getQuizById = async (req: Request, res: Response) => {
    const quizId = req.params.id;
    try {
        const quiz = await client.quiz.findUnique({
            where: {
                id: quizId
            },
            select:{
                quizTitle:true,
                id:true,
                questions:{
                    select:{
                        questionTitle:true,
                        id:true,
                        answers:{
                            select:{
                                text:true,
                                isCorrect:true,
                                id:true
                            }
                        }
                    }
                }
            }
        })
        res.status(200).json({
            message: "Quiz fetched successfully",
            data: quiz,
            success:true

        })


    } catch (error) {
        console.log(error, "ERROR while fetching quiz")
        res.status(500).json({ error: "Internal server error", success:false });
        return;
    }
}



export { createQuiz, getQuizById, getQuizzes };
