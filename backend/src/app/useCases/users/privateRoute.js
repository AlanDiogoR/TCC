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
Object.defineProperty(exports, "__esModule", { value: true });
exports.privateRoute = void 0;
const User_1 = require("../../models/User");
function privateRoute(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const user = yield User_1.User.findById(id, '-password');
        if (!user) {
            return res.status(404).json({ msg: 'user undefined' });
        }
        function chechToken(req, res, next) {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split('')[1];
            if (!token) {
                return res.status(401).json({ msg: 'acesso negado' });
            }
        }
        res.status(200).json({ user });
    });
}
exports.privateRoute = privateRoute;
