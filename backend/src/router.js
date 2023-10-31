"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const node_path_1 = __importDefault(require("node:path"));
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const createCategory_1 = require("./app/useCases/categories/createCategory");
const listCategories_1 = require("./app/useCases/categories/listCategories");
const listProductByCategory_1 = require("./app/useCases/categories/listProductByCategory");
const deleteCategory_1 = require("./app/useCases/categories/deleteCategory");
const listProduct_1 = require("./app/useCases/products/listProduct");
const listAddress_1 = require("./app/useCases/addresses/listAddress");
const listPurchaseItem_1 = require("./app/useCases/purchaseItems/listPurchaseItem");
const listPurchase_1 = require("./app/useCases/purchases/listPurchase");
const listUser_1 = require("./app/useCases/users/listUser");
const createAddress_1 = require("./app/useCases/addresses/createAddress");
const createProduct_1 = require("./app/useCases/products/createProduct");
const createPurchase_1 = require("./app/useCases/purchases/createPurchase");
const createPurchaseItem_1 = require("./app/useCases/purchaseItems/createPurchaseItem");
const createUser_1 = require("./app/useCases/users/createUser");
const deleteAddress_1 = require("./app/useCases/addresses/deleteAddress");
const deleteProduct_1 = require("./app/useCases/products/deleteProduct");
const deletePurchaseItem_1 = require("./app/useCases/purchaseItems/deletePurchaseItem");
const deletePurchase_1 = require("./app/useCases/purchases/deletePurchase");
const deleteUser_1 = require("./app/useCases/users/deleteUser");
const loginUser_1 = require("./app/useCases/users/loginUser");
exports.router = (0, express_1.Router)();
const upload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination(req, file, callback) {
            callback(null, node_path_1.default.resolve(__dirname, '..', 'uploads'));
        },
        filename(req, file, callback) {
            callback(null, `${Date.now()}-${file.originalname}`);
        },
    }),
});
//public route
exports.router.get('/', (req, res) => {
    res.status(200).json({ msg: 'Bem vindo a pagina publica' });
});
//list
exports.router.get('/categories', listCategories_1.listCategories);
exports.router.get('/products', listProduct_1.listProducts);
exports.router.get('/addresses', listAddress_1.listAddress);
exports.router.get('/purchaseItems', listPurchaseItem_1.listPurchaseItem);
exports.router.get('/purchases', listPurchase_1.listPurchase);
exports.router.get('/users', listUser_1.listUser);
//create
exports.router.post('/categories', createCategory_1.createCategory);
exports.router.post('/addresses', createAddress_1.createAddress);
exports.router.post('/products', upload.single('image'), createProduct_1.createProduct);
exports.router.post('/purchaseItems', createPurchaseItem_1.createPurchaseItem);
exports.router.post('/purchases', createPurchase_1.createPurchase);
exports.router.post('/users', createUser_1.createUser);
exports.router.post('/auth/login', loginUser_1.loginUser);
//get product by category
exports.router.get('/categories/:categoryId/products', listProductByCategory_1.listProductByCategory);
//delete
exports.router.delete('/categories/:categoryId', deleteCategory_1.deleteCategory);
exports.router.delete('/addresses/:addressId', deleteAddress_1.deleteAddress);
exports.router.delete('/categories/:categoryId', deleteCategory_1.deleteCategory);
exports.router.delete('/products/:productId', deleteProduct_1.deleteProduct);
exports.router.delete('/purchaseItems/:PurchaseItemId', deletePurchaseItem_1.deletePurchaseItem);
exports.router.delete('/purchases/:purchaseId', deletePurchase_1.deletePurchase);
exports.router.delete('/users/:userId', deleteUser_1.deleteUser);
