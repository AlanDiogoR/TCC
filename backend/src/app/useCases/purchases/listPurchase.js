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
exports.listPurchase = void 0;
const Purchase_1 = require("../../models/Purchase");
function listPurchase(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const purchase = yield Purchase_1.Purchase.find();
            if (!Purchase_1.Purchase) {
                return res.status(400).json({
                    error: 'Purchase is required',
                });
            }
            res.json(purchase);
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    });
}
exports.listPurchase = listPurchase;
