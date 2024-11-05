import z from "zod"
const userSchema=z.object({
    clerkId:z.string().min(1),
    name:z.string().min(1),
    email:z.string().email(),
})

const quizSchema=z.object({
    quizTitle:z.string().min(1)
})

const questionSchema=z.object({
    quizId: z.string().uuid(),
    questionTitle:z.string().min(1),
})

const answerSchema=z.object({
    questionId: z.string().uuid(), 
    text:z.string().min(1),
    isCorrect:z.boolean()
})

export {
    userSchema,
    quizSchema,
    questionSchema,
    answerSchema
}