"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const socket_io_1 = require("socket.io");
const node_http_1 = __importDefault(require("node:http"));
const user_rotue_1 = __importDefault(require("./routes/user.rotue"));
const quiz_route_1 = __importDefault(require("./routes/quiz.route"));
const question_router_1 = __importDefault(require("./routes/question.router"));
const answer_route_1 = __importDefault(require("./routes/answer.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use((0, cookie_parser_1.default)());
// creating routes
app.use("/api/v1/user", user_rotue_1.default);
app.use("/api/v1/quiz", quiz_route_1.default);
app.use("/api/v1/question", question_router_1.default);
app.use("/api/v1/answer", answer_route_1.default);
const server = node_http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
// we can pass options here
});
server.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
exports.default = app;
