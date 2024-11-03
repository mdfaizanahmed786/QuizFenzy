import { Request, Response } from "express";
import { questionSchema } from "../validation/validation";
import client from "../utils/client";

const createQuestion = async (req: Request, res: Response) => {
    const questionBody = req.body;
    const parsedQuestionBody = questionSchema.safeParse(questionBody);
    try {

        if (!parsedQuestionBody.success) {
            res.status(400).json({ error: parsedQuestionBody.error });
            return;
        }
        const question = parsedQuestionBody.data;


        const newQuestion = await client.question.create({
            data: {
                questionTitle: question.questionTitle,
                quizId: question.quizId
            },
            select: {
                id: true,
                questionTitle: true,
                quizId: true
            }
        })

        if (newQuestion) {
            const newAnswer = await client.answer.create({
                data: {
                    text: "Your answer",
                    questionId: newQuestion.id,
                    isCorrect: false
                },

                select: {
                    id: true,
                    text: true,
                    questionId: true,
                    isCorrect: true
                }
            })

            res.status(201).json({
                message: "Question added successfully",
                data: {
                    question: newQuestion,
                    answer: newAnswer
                }
            })

            return;

        }
        res.status(500).json({ error: "Error while creating question" });
        return;

    } catch (error) {

        console.log(error, "ERROR while adding question")
        res.status(500).json({ error: "Internal server error" });
        return;

    }
}



const editQuestion = async (req: Request, res: Response) => {
    const questionBody = req.body;
    const questionTitle = questionBody.questionTitle;
    try {

        if (!questionTitle) {
            res.status(400).json({ error: "Question title is required" });
            return;
        }

        const questionId = questionBody.id;
        await client.question.update({
            where: {
                id: questionId
            },
            data: {
                questionTitle: questionTitle
            }
        });

        res.status(200).json({
            message: "Question updated successfully"
        })
        return;

    } catch (error) {

        console.log(error, "ERROR while updating question")
        res.status(500).json({ error: "Internal server error" });
        return;
    }
}

const deleteQuestion = async (req: Request, res: Response) => {

    const questionBody = req.body;
    const questionId = questionBody.id;
    const quizId = questionBody.quizId;

    try {
        if (!questionId) {
            res.status(400).json({ error: "Question id is required" });
            return;
        }

        if (!quizId) {
            res.status(400).json({ error: "Quiz id is required" });
            return;
        }
        const questionsInQuiz = await client.quiz.findUnique({
            where: {
                id: quizId
            },
            select: {
                questions: true
            }
        })

        if (!questionsInQuiz) {
            res.status(400).json({ error: "Quiz not found" });
            return;
        }

        if (questionsInQuiz.questions.length <= 1) {
            res.status(400).json({ error: "Quiz should have at least one question" });
            return;
        }

        await client.question.delete({
            where: {
                id: questionId
            }
        });

        res.status(200).json({
            message: "Question deleted successfully"
        })

        return;

    } catch (error) {

        console.log(error, "ERROR while deleting question")
        res.status(500).json({ error: "Internal server error" });
        return;

    }
}


export { createQuestion, editQuestion, deleteQuestion }