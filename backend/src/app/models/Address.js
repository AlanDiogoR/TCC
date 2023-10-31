"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = void 0;
const mongoose_1 = require("mongoose");
exports.Address = (0, mongoose_1.model)('Address', new mongoose_1.Schema({
    zipCode: {
        type: Number,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    neighborhood: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    numberHouse: {
        type: Number,
        required: true,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    }
}));
