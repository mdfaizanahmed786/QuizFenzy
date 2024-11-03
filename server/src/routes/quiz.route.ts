import express from "express";
import { createQuiz, getQuizzes } from "../controllers/quiz.controller";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const router= express.Router();


router.post("/create",ClerkExpressRequireAuth(), createQuiz);
router.get("/", ClerkExpressRequireAuth(), getQuizzes);


export default router;  