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
exports.createQuiz = exports.getQuizzes = void 0;
const client_1 = __importDefault(require("../utils/client"));
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
            data: quizzes
        });
    }
    catch (error) {
        console.log(error, "ERROR while fetching quizzes");
        res.status(500).json({ error: "Internal server error" });
        return;
    }
});
exports.getQuizzes = getQuizzes;
const createQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
    }
});
exports.createQuiz = createQuiz;
