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
exports.createPurchase = void 0;
const Purchase_1 = require("../../models/Purchase");
function createPurchase(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { value, paymentMethod, status, date, addressId } = req.body;
            const purchase = yield Purchase_1.Purchase.create({ value, paymentMethod, status, date, addressId });
            if (!value) {
                return res.status(400).json({
                    error: 'Value is required',
                });
            }
            if (!paymentMethod) {
                return res.status(400).json({
                    error: 'PaymentMethod is required',
                });
            }
            if (!status) {
                return res.status(400).json({
                    error: 'Status is required',
                });
            }
            if (!date) {
                return res.status(400).json({
                    error: 'Date is required',
                });
            }
            if (!addressId) {
                return res.status(400).json({
                    error: 'AddressId is required',
                });
            }
            res.status(201).json(purchase);
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    });
}
exports.createPurchase = createPurchase;
