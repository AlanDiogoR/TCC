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
exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../../models/User");
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, password, email, createAt, } = req.body;
            const salt = yield bcrypt_1.default.genSalt(12);
            const passwordHash = yield bcrypt_1.default.hash(password, salt);
            const nameHash = yield bcrypt_1.default.hash(name, salt);
            //const user = await User.create({ name, password, email, createAt });
            const usern = new User_1.User({
                name: nameHash,
                password: passwordHash,
                email,
                createAt
            });
            const userExists = yield User_1.User.findOne({ email: email });
            if (userExists) {
                return res.status(422).json({
                    error: 'Por favor, utilize outro email!',
                });
            }
            if (!name) {
                return res.status(422).json({
                    error: 'Name is required',
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
            yield usern.save();
            res.status(201).json(usern);
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    });
}
exports.createUser = createUser;
