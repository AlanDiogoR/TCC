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
exports.createProduct = void 0;
const Product_1 = require("../../models/Product");
function createProduct(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, description, quantity, details, price, category } = req.body;
            const imagePath = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
            const product = yield Product_1.Product.create({
                name,
                description,
                quantity,
                imagePath,
                details,
                price: Number(price),
                category,
            });
            if (!name) {
                return res.status(400).json({
                    error: 'Name is required',
                });
            }
            if (!quantity) {
                return res.status(400).json({
                    error: 'Quantity is required',
                });
            }
            if (!description) {
                return res.status(400).json({
                    error: 'Description is required',
                });
            }
            if (!details) {
                return res.status(400).json({
                    error: 'Description is required',
                });
            }
            if (!price) {
                return res.status(400).json({
                    error: 'Price is required',
                });
            }
            if (!product) {
                return res.status(400).json({
                    error: 'Product is required',
                });
            }
            if (!imagePath) {
                return res.status(400).json({
                    error: 'ImagePath is required',
                });
            }
            res.status(201).json(product);
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    });
}
exports.createProduct = createProduct;
