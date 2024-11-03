import express from "express";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import { addAnswer, deleteAnswer, editAnswer } from "../controllers/answer.controller";


const router= express.Router();

router.use(ClerkExpressRequireAuth());

router.post("/add", addAnswer);
router.get("/remove", deleteAnswer);
router.put("/edit", editAnswer);


export default router;  