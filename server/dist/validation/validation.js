"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.answerSchema = exports.questionSchema = exports.quizSchema = exports.userSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const userSchema = zod_1.default.object({
    clerkId: zod_1.default.string().min(1),
    name: zod_1.default.string().min(1),
    email: zod_1.default.string().email(),
});
exports.userSchema = userSchema;
const quizSchema = zod_1.default.object({
    quizTitle: zod_1.default.string().min(1)
});
exports.quizSchema = quizSchema;
const questionSchema = zod_1.default.object({
    quizId: zod_1.default.string().uuid(),
    questionTitle: zod_1.default.string().min(1),
});
exports.questionSchema = questionSchema;
const answerSchema = zod_1.default.object({
    questionId: zod_1.default.string().uuid(),
    text: zod_1.default.string().min(1),
    isCorrect: zod_1.default.boolean()
});
exports.answerSchema = answerSchema;
