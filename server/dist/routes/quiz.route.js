"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const quiz_controller_1 = require("../controllers/quiz.controller");
const clerk_sdk_node_1 = require("@clerk/clerk-sdk-node");
const router = express_1.default.Router();
router.post("/create", (0, clerk_sdk_node_1.ClerkExpressRequireAuth)(), quiz_controller_1.createQuiz);
router.get("/", (0, clerk_sdk_node_1.ClerkExpressRequireAuth)(), quiz_controller_1.getQuizzes);
exports.default = router;
