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
exports.deletePurchaseItem = void 0;
const PurchaseItem_1 = require("../../models/PurchaseItem");
function deletePurchaseItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { PurchaseItemId } = req.params;
            yield PurchaseItem_1.PurchaseItem.findByIdAndDelete(PurchaseItemId);
            if (!PurchaseItemId) {
                return res.status(400).json({
                    error: 'PurchaseItemId is required',
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
exports.deletePurchaseItem = deletePurchaseItem;
