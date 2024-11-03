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
exports.deleteQuestion = exports.editQuestion = exports.createQuestion = void 0;
const validation_1 = require("../validation/validation");
const client_1 = __importDefault(require("../utils/client"));
const createQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const questionBody = req.body;
    const parsedQuestionBody = validation_1.questionSchema.safeParse(questionBody);
    try {
        if (!parsedQuestionBody.success) {
            res.status(400).json({ error: parsedQuestionBody.error });
            return;
        }
        const question = parsedQuestionBody.data;
        const newQuestion = yield client_1.default.question.create({
            data: {
                questionTitle: question.questionTitle,
                quizId: question.quizId
            },
            select: {
                id: true,
                questionTitle: true,
                quizId: true
            }
        });
        if (newQuestion) {
            const newAnswer = yield client_1.default.answer.create({
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
            });
            res.status(201).json({
                message: "Question added successfully",
                data: {
                    question: newQuestion,
                    answer: newAnswer
                }
            });
            return;
        }
        res.status(500).json({ error: "Error while creating question" });
        return;
    }
    catch (error) {
        console.log(error, "ERROR while adding question");
        res.status(500).json({ error: "Internal server error" });
        return;
    }
});
exports.createQuestion = createQuestion;
const editQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const questionBody = req.body;
    const questionTitle = questionBody.questionTitle;
    try {
        if (!questionTitle) {
            res.status(400).json({ error: "Question title is required" });
            return;
        }
        const questionId = questionBody.id;
        yield client_1.default.question.update({
            where: {
                id: questionId
            },
            data: {
                questionTitle: questionTitle
            }
        });
        res.status(200).json({
            message: "Question updated successfully"
        });
        return;
    }
    catch (error) {
        console.log(error, "ERROR while updating question");
        res.status(500).json({ error: "Internal server error" });
        return;
    }
});
exports.editQuestion = editQuestion;
const deleteQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const questionsInQuiz = yield client_1.default.quiz.findUnique({
            where: {
                id: quizId
            },
            select: {
                questions: true
            }
        });
        if (!questionsInQuiz) {
            res.status(400).json({ error: "Quiz not found" });
            return;
        }
        if (questionsInQuiz.questions.length <= 1) {
            res.status(400).json({ error: "Quiz should have at least one question" });
            return;
        }
        yield client_1.default.question.delete({
            where: {
                id: questionId
            }
        });
        res.status(200).json({
            message: "Question deleted successfully"
        });
        return;
    }
    catch (error) {
        console.log(error, "ERROR while deleting question");
        res.status(500).json({ error: "Internal server error" });
        return;
    }
});
exports.deleteQuestion = deleteQuestion;
