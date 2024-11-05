import { Request, Response } from "express";
import { answerSchema } from "../validation/validation";
import client from "../utils/client";



const addAnswer = async (req: Request, res: Response) => {
    const answerBody = req.body;

    const parsedAnswerBody = answerSchema.safeParse(answerBody);
    try {
        if (!parsedAnswerBody.success) {
            res.status(400).json({ error: parsedAnswerBody.error, success:false });
            return;
        }

        const answer = parsedAnswerBody.data;
        const newAnswer = await client.answer.create({
            data: {
                text: answer.text,
                questionId: answer.questionId,
                isCorrect: answer.isCorrect,
            }
        })

        res.status(201).json({
            message: "Answer added successfully",
            data: newAnswer,
            success:true
        })
        return;

    } catch (error) {
        console.log(error, "ERROR while adding answer")
        res.status(500).json({ error: "Internal server error", success:false });
        return;
    }
}



const editAnswer = async (req: Request, res: Response) => {
    const answerBody = req.body;
    const newText = answerBody.text;
    const updatedCorrected = answerBody.isCorrect;
    try {
        if (!newText || !updatedCorrected) {
            res.status(400).json({ error: "Text is required", success:false });
            return
        }

        const answerId = answerBody.id;

        if (!answerId) {
            res.status(400).json({ error: "Answer id is required", success:false });
            return
        }

        if (updatedCorrected) {
            await client.answer.update({
                where: {
                    id: answerId
                },
                data: {
                    text: newText,
                    isCorrect: updatedCorrected
                }
            });

        }

        else {
            await client.answer.update({
                where: {
                    id: answerId
                },
                data: {
                    text: newText
                }
            });


        }


        res.status(200).json({
            message: "Answer updated successfully",
            success:true
        })

        return;

    } catch (error) {
        console.log(error, "ERROR while updating answer")
        res.status(500).json({ error: "Internal server error", success:false });
        return

    }
}

const deleteAnswer = (req: Request, res: Response) => {
    const answerId = req.body.id;

    try {

        if (!answerId) {
            res.status(400).json({ error: "Answer id is required", success:false });
            return
        }

        const deletedAnswer = client.answer.delete({
            where: {
                id: answerId
            }
        });

        res.status(200).json({
            message: "Answer deleted successfully",
            data: deletedAnswer,
            success:true
        })
        return;

    } catch (error) {
        console.log(error, "ERROR while deleting answer")
        res.status(500).json({ error: "Internal server error", success:false });
        return
    }

}


export { addAnswer, editAnswer, deleteAnswer }