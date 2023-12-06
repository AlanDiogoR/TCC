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
exports.listProductsBySearch = void 0;
const Product_1 = require("../../models/Product");
function listProductsBySearch(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const searchTerm = req.body;
            if (!searchTerm) {
                return res.status(400).json({
                    error: 'Search term is required',
                });
            }
            // Use uma expressão regular para realizar uma pesquisa de texto insensível a maiúsculas e minúsculas
            const regex = new RegExp(searchTerm, 'i');
            // Pesquise produtos com base no nome
            const products = yield Product_1.Product.find({ name: regex });
            res.json(products);
        }
        catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    });
}
exports.listProductsBySearch = listProductsBySearch;
