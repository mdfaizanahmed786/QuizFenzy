import express from "express";
import { createQuestion, deleteQuestion, editQuestion } from "../controllers/question.controller";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";


const router = express.Router();

router.use(ClerkExpressRequireAuth());


router.post("/create", createQuestion);
router.delete("/remove", deleteQuestion);
router.put("/edit", editQuestion);


export default router;  