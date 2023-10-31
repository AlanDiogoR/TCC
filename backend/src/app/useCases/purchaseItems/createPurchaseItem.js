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
exports.createPurchaseItem = void 0;
const PurchaseItem_1 = require("../../models/PurchaseItem");
function createPurchaseItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { products, value, productId, PurchaseId } = req.body;
            const purchaseItem = yield PurchaseItem_1.PurchaseItem.create({ products, value, productId, PurchaseId });
            if (!products) {
                return res.status(400).json({
                    error: 'Products- is required',
                });
            }
            if (!value) {
                return res.status(400).json({
                    error: 'Value is required',
                });
            }
            if (!productId) {
                return res.status(400).json({
                    error: 'ProductId is required',
                });
            }
            if (!PurchaseId) {
                return res.status(400).json({
                    error: 'PurchaseId is required',
                });
            }
            if (!products) {
                return res.status(400).json({
                    error: 'Products- is required',
                });
            }
            if (!value) {
                return res.status(400).json({
                    error: 'Value is required',
                });
            }
            if (!productId) {
                return res.status(400).json({
                    error: 'ProductId is required',
                });
            }
            if (!PurchaseId) {
                return res.status(400).json({
                    error: 'PurchaseId is required',
                });
            }
            if (!purchaseItem) {
                return res.status(400).json({
                    error: 'PurchaseItem is required',
                });
            }
            res.status(201).json(purchaseItem);
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    });
}
exports.createPurchaseItem = createPurchaseItem;
