"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const node_path_1 = __importDefault(require("node:path"));
const node_http_1 = __importDefault(require("node:http"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const router_1 = require("./router");
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const server = node_http_1.default.createServer(app);
exports.io = new socket_io_1.Server(server);
mongoose_1.default.connect('mongodb+srv://Verdan:wmxgqBWVQMxtYALv@cluster0.6jyfvkh.mongodb.net/')
    .then(() => {
    const port = 3001;
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', '*');
        res.setHeader('Access-Control-Allow-Headers', '*');
        next();
    });
    app.use(express_1.default.json());
    app.use(router_1.router);
    app.use('/uploads', express_1.default.static(node_path_1.default.resolve(__dirname, '..', 'uploads')));
    server.listen(port, () => {
        console.log(`🚀 Server is running on http://localhost:${port}`);
    });
})
    .catch((erro) => console.log('erro ao conectar', erro));
