"use strict";
// userChangePassword.ts
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
exports.changePassword = void 0;
const User_1 = require("../../models/User");
function changePassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userId, currentPassword, newPassword } = req.body;
            // Verifica se o usuário existe
            const user = yield User_1.User.findById(userId);
            if (!user) {
                return res.status(404).json({
                    error: 'Usuário não encontrado',
                });
            }
            // Verifica a senha atual
            if (user.password !== currentPassword) {
                return res.status(401).json({
                    error: 'Senha atual incorreta',
                });
            }
            // Atualiza a senha do usuário
            user.password = newPassword;
            yield user.save();
            res.json({
                success: true,
                message: 'Senha alterada com sucesso',
            });
        }
        catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    });
}
exports.changePassword = changePassword;
