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
exports.deletePurchase = void 0;
const Purchase_1 = require("../../models/Purchase");
function deletePurchase(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { purchaseId } = req.params;
            yield Purchase_1.Purchase.findByIdAndDelete(purchaseId);
            if (!purchaseId) {
                return res.status(400).json({
                    error: 'PurchaseId is required',
                });
            }
            res.sendStatus(204);
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    });
}
exports.deletePurchase = deletePurchase;
