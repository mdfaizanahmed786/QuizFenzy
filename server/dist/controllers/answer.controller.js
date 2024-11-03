"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAnswer = exports.editAnswer = exports.addAnswer = void 0;
const validation_1 = require("../validation/validation");
const client_1 = __importDefault(require("../utils/client"));
const addAnswer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const answerBody = req.body;
    const parsedAnswerBody = validation_1.answerSchema.safeParse(answerBody);
    try {
        if (!parsedAnswerBody.success) {
            res.status(400).json({ error: parsedAnswerBody.error });
            return;
        }
        const answer = parsedAnswerBody.data;
        const newAnswer = yield client_1.default.answer.create({
            data: {
                text: answer.text,
                questionId: answer.questionId,
                isCorrect: answer.isCorrect,
            }
        });
        res.status(201).json({
            message: "Answer added successfully",
            data: newAnswer
        });
        return;
    }
    catch (error) {
        console.log(error, "ERROR while adding answer");
        res.status(500).json({ error: "Internal server error" });
        return;
    }
});
exports.addAnswer = addAnswer;
const editAnswer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const answerBody = req.body;
    const newText = answerBody.text;
    const updatedCorrected = answerBody.isCorrect;
    try {
        if (!newText || !updatedCorrected) {
            res.status(400).json({ error: "Text is required" });
            return;
        }
        const answerId = answerBody.id;
        if (!answerId) {
            res.status(400).json({ error: "Answer id is required" });
            return;
        }
        if (updatedCorrected) {
            yield client_1.default.answer.update({
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
            yield client_1.default.answer.update({
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
        });
        return;
    }
    catch (error) {
        console.log(error, "ERROR while updating answer");
        res.status(500).json({ error: "Internal server error" });
        return;
    }
});
exports.editAnswer = editAnswer;
const deleteAnswer = (req, res) => {
    const answerId = req.body.id;
    try {
        if (!answerId) {
            res.status(400).json({ error: "Answer id is required" });
            return;
        }
        const deletedAnswer = client_1.default.answer.delete({
            where: {
                id: answerId
            }
        });
        res.status(200).json({
            message: "Answer deleted successfully",
            data: deletedAnswer
        });
        return;
    }
    catch (error) {
        console.log(error, "ERROR while deleting answer");
        res.status(500).json({ error: "Internal server error" });
        return;
    }
};
exports.deleteAnswer = deleteAnswer;
