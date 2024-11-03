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
            }
        });
        if (newQuestion) {
            const newAnswer = yield client_1.default.answer.create({
                data: {
                    text: "Your answer",
                    questionId: newQuestion.id,
                    isCorrect: false
                }
            });
        }
    }
    catch (error) {
    }
});
exports.createQuestion = createQuestion;
const editQuestion = (req, res) => {
    try {
    }
    catch (error) {
    }
};
exports.editQuestion = editQuestion;
const deleteQuestion = (req, res) => {
    try {
    }
    catch (error) {
    }
};
exports.deleteQuestion = deleteQuestion;
