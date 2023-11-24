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
exports.listProductById = void 0;
const Product_1 = require("../../models/Product");
function listProductById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { productId } = req.params;
            if (!productId) {
                return res.status(400).json({
                    error: 'ProductId is required',
                });
            }
            const product = yield Product_1.Product.findById(productId);
            if (!product) {
                return res.status(404).json({
                    error: 'Product not found',
                });
            }
            res.json(product);
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    });
}
exports.listProductById = listProductById;
