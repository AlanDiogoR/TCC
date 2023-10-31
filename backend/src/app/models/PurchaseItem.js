"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseItem = void 0;
const mongoose_1 = require("mongoose");
exports.PurchaseItem = (0, mongoose_1.model)('PurchaseItem', new mongoose_1.Schema({
    products: {
        required: true,
        type: [{
                product: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    required: true,
                    ref: 'Product',
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
            }],
    },
    value: {
        type: Number,
        required: true,
    },
    productId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
    },
    PurchaseId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Purchase',
    }
}));
