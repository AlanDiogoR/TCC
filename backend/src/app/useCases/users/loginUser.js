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
exports.loginUser = void 0;
const User_1 = require("../../models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { password, email, } = req.body;
            const user = yield User_1.User.findOne({ email: email });
            const secret = 'ldsdjlsmfklmjdsj$%%@$367824848*156548*498765';
            const token = jsonwebtoken_1.default.sign({
                id: user === null || user === void 0 ? void 0 : user._id,
            }, secret);
            if (!user) {
                return res.status(404).json({
                    error: 'Usuário não encontrado!',
                });
            }
            if (!password) {
                return res.status(400).json({
                    error: 'Passoword is required',
                });
            }
            if (!email) {
                return res.status(400).json({
                    error: 'Email is required',
                });
            }
            const checkPassword = yield bcrypt_1.default.compare(password, user.password);
            if (!checkPassword) {
                return res.status(422).json({ msg: 'Senha Inválida!' });
            }
            res.status(200).json({ msg: 'authentication completed successfully', token });
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    });
}
exports.loginUser = loginUser;
