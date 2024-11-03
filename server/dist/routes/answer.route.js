"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const clerk_sdk_node_1 = require("@clerk/clerk-sdk-node");
const answer_controller_1 = require("../controllers/answer.controller");
const router = express_1.default.Router();
router.use((0, clerk_sdk_node_1.ClerkExpressRequireAuth)());
router.post("/add", answer_controller_1.addAnswer);
router.get("/remove", answer_controller_1.deleteAnswer);
router.put("/edit", answer_controller_1.editAnswer);
exports.default = router;
