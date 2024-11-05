import express from "express";
import { createQuiz, getQuizById, getQuizzes } from "../controllers/quiz.controller";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const router= express.Router();


router.post("/create",ClerkExpressRequireAuth(), createQuiz);
router.get("/", ClerkExpressRequireAuth(), getQuizzes);
router.get("/:quizId", ClerkExpressRequireAuth(), getQuizById);


export default router;  