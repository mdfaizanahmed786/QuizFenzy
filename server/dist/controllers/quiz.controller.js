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
exports.getQuizzes = exports.getQuizById = exports.createQuiz = void 0;
const client_1 = __importDefault(require("../utils/client"));
const validation_1 = require("../validation/validation");
const getQuizzes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req;
    const userId = user.auth.userId;
    try {
        const quizzes = yield client_1.default.quiz.findMany({
            where: {
                creatorId: userId
            }
        });
        res.status(200).json({
            message: "Quizzes fetched successfully",
            data: quizzes,
            success: true
        });
    }
    catch (error) {
        console.log(error, "ERROR while fetching quizzes");
        res.status(500).json({ error: "Internal server error", success: false });
        return;
    }
});
exports.getQuizzes = getQuizzes;
const createQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req;
    const userId = user.auth.userId;
    const quizBody = req.body;
    const parsedQuizBody = validation_1.quizSchema.safeParse(quizBody);
    try {
        if (!parsedQuizBody.success) {
            res.status(400).json({ error: parsedQuizBody.error, success: false });
            return;
        }
        const quiz = parsedQuizBody.data;
        const newQuiz = yield client_1.default.quiz.create({
            data: {
                quizTitle: quiz.quizTitle,
                creatorId: userId
            },
            select: {
                quizTitle: true,
                id: true
            }
        });
        if (!newQuiz) {
            res.status(500).json({ error: "Error while creating quiz", success: false });
            return;
        }
        const newQuestion = yield client_1.default.question.create({
            data: {
                questionTitle: "Your question",
                quizId: newQuiz.id
            }
        });
        if (!newQuestion) {
            res.status(500).json({ error: "Error while creating question", success: false });
            return;
        }
        yield client_1.default.answer.create({
            data: {
                text: "Your answer",
                questionId: newQuestion.id,
                isCorrect: false
            }
        });
        res.status(201).json({
            message: "Quiz created successfully",
            data: {
                quiz: newQuiz
            },
            success: true
        });
        return;
    }
    catch (error) {
        console.log(error, "ERROR while creating quiz");
        res.status(500).json({ error: "Internal server error", success: false });
        return;
    }
});
exports.createQuiz = createQuiz;
const getQuizById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const quizId = req.params.quizId;
    if (!quizId) {
        res.status(400).json({ error: "Quiz id is required", success: false });
        return;
    }
    try {
        const quiz = yield client_1.default.quiz.findUnique({
            where: {
                id: quizId
            },
            select: {
                quizTitle: true,
                id: true,
                questions: {
                    select: {
                        questionTitle: true,
                        id: true,
                        answers: {
                            select: {
                                text: true,
                                isCorrect: true,
                                id: true
                            }
                        }
                    }
                }
            }
        });
        res.status(200).json({
            message: "Quiz fetched successfully",
            data: quiz,
            success: true
        });
    }
    catch (error) {
        console.log(error, "ERROR while fetching quiz");
        res.status(500).json({ error: "Internal server error", success: false });
        return;
    }
});
exports.getQuizById = getQuizById;
