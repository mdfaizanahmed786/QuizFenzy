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
exports.registerUser = void 0;
const validation_1 = require("../validation/validation");
const client_1 = __importDefault(require("../utils/client"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userBody = req.body;
    const parseUserBody = validation_1.userSchema.safeParse(userBody);
    try {
        if (!parseUserBody.success) {
            res.status(400).json({ error: parseUserBody.error, success: false });
            return;
        }
        const user = parseUserBody.data;
        const existingUser = yield client_1.default.user.findUnique({
            where: {
                email: user.email
            }
        });
        if (existingUser) {
            res.status(400).json({ error: "User already exists", success: false });
            return;
        }
        const newUser = yield client_1.default.user.create({
            data: {
                name: user.name,
                email: user.email,
                clerkId: user.clerkId
            }
        });
        if (!newUser) {
            res.status(500).json({ error: "Error while creating user", success: false });
            return;
        }
        res.status(201).json({
            message: "User created successfully",
            data: newUser,
            success: true
        });
        return;
    }
    catch (error) {
        console.log(error, "Error while creating user");
        res.status(500).json({ error: "Internal server error", success: false });
        return;
    }
});
exports.registerUser = registerUser;
