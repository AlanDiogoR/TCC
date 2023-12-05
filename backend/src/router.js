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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const node_path_1 = __importDefault(require("node:path"));
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
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
const User_1 = require("./app/models/User");
const listProductById_1 = require("./app/useCases/products/listProductById");
const listUserByEmail_1 = require("./app/useCases/users/listUserByEmail");
const changeUserPassword_1 = require("./app/useCases/users/changeUserPassword");
const changePassword_1 = require("./app/useCases/users/changePassword");
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
exports.router.get('/users/:id', chechToken, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const user = yield User_1.User.findById(id, '-password');
        if (!user) {
            return res.status(404).json({ msg: 'user undefined' });
        }
        res.status(200).json({ user });
    });
});
function chechToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ msg: 'acesso negado' });
    }
    try {
        const secret = 'ldsdjlsmfklmjdsj$%%@$367824848*156548*498765';
        jsonwebtoken_1.default.verify(token, secret);
        next();
    }
    catch (error) {
        res.status(400).json({ msg: 'tonken invalid' });
    }
}
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
exports.router.get('/products/:productId', listProductById_1.listProductById);
exports.router.get('/users/:userEmail', listUserByEmail_1.listUserByEmail);
//change
exports.router.patch('/users/changeUserPassword', chechToken, changeUserPassword_1.changeUserPassword);
exports.router.patch('/users/changePassword', chechToken, changePassword_1.changePassword);
//delete
exports.router.delete('/categories/:categoryId', deleteCategory_1.deleteCategory);
exports.router.delete('/addresses/:addressId', deleteAddress_1.deleteAddress);
exports.router.delete('/categories/:categoryId', deleteCategory_1.deleteCategory);
exports.router.delete('/products/:productId', deleteProduct_1.deleteProduct);
exports.router.delete('/purchaseItems/:PurchaseItemId', deletePurchaseItem_1.deletePurchaseItem);
exports.router.delete('/purchases/:purchaseId', deletePurchase_1.deletePurchase);
exports.router.delete('/users/:userId', deleteUser_1.deleteUser);
