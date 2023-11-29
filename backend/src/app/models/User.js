"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
exports.User = (0, mongoose_1.model)('User', new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    adressId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Address',
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
}));
