import express from "express";
import { createQuestion, deleteQuestion, editQuestion } from "../controllers/question.controller";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";


const router = express.Router();

router.use(ClerkExpressRequireAuth());


router.post("/add", createQuestion);
router.get("/remove", deleteQuestion);
router.put("/edit", editQuestion);


export default router;  