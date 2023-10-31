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
exports.listUser = void 0;
const User_1 = require("../../models/User");
function listUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield User_1.User.find();
            if (!user) {
                return res.status(400).json({
                    error: 'User is required',
                });
            }
            res.json(user);
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    });
}
exports.listUser = listUser;
