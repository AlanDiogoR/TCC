"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseItem = void 0;
const mongoose_1 = require("mongoose");
exports.PurchaseItem = (0, mongoose_1.model)('PurchaseItem', new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    productId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
    },
}));
