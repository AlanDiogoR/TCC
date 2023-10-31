"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Purchase = void 0;
const mongoose_1 = require("mongoose");
exports.Purchase = (0, mongoose_1.model)('Purchase', new mongoose_1.Schema({
    value: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: [
            'SELECTING', 'PACKING', 'SENT'
        ],
        default: 'SELECTING',
    },
    date: {
        type: Date,
        required: Date.now,
    },
    addressId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Address',
    }
}));
