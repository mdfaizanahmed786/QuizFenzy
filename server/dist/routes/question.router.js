"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const question_controller_1 = require("../controllers/question.controller");
const clerk_sdk_node_1 = require("@clerk/clerk-sdk-node");
const router = express_1.default.Router();
router.use((0, clerk_sdk_node_1.ClerkExpressRequireAuth)());
router.post("/create", question_controller_1.createQuestion);
router.delete("/remove", question_controller_1.deleteQuestion);
router.put("/edit", question_controller_1.editQuestion);
exports.default = router;
