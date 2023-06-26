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
exports.SearchByFilter = exports.DeleteProduct = exports.EditProductDetails = exports.AddProduct = exports.GetAllProducts = exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const product_model_1 = require("../models/product.model");
exports.userRouter = express_1.default.Router();
const productsPerPage = 8;
//Get All Products
exports.GetAllProducts = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req;
    const page = query.page || 1;
    const pageSize = query.pageSize || query.PAGE_SIZE;
    const products = yield product_model_1.ProductModel
        .find()
        .skip(pageSize * (page - 1))
        .limit(pageSize);
    const countProducts = yield product_model_1.ProductModel.countDocuments();
    res.send({
        products,
        countProducts,
        page,
        pages: Math.ceil(countProducts / productsPerPage),
    });
}));
//Add Product by admin only
exports.AddProduct = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let findProduct = yield product_model_1.ProductModel.findOne({ brand: req.body.brand });
    const findProductSize = yield product_model_1.ProductModel.findOne({ size: req.body.size });
    if (findProduct && findProductSize) {
        res.send("Product alreaddy exists. You might want to consider updating the existing product");
    }
    else {
        const product = yield product_model_1.ProductModel.create({
            brand: req.body.brand,
            size: req.body.size,
            price: req.body.price,
            image: req.body.image,
            countInStock: req.body.countInStock,
        });
        res.json({
            _id: product.id,
            brand: product.brand,
            size: product.size,
            price: product.price,
            image: product.image,
            countInStock: product.countInStock,
        });
    }
}));
//Edit Product
exports.EditProductDetails = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    const product = yield product_model_1.ProductModel.findById(productId);
    if (product) {
        product.price = req.body.price;
        product.image = req.body.image;
        product.size = req.body.size;
        product.brand = req.body.brand;
        product.countInStock = req.body.countInStock;
        yield product.save();
        res.send({ message: 'Product Updated' });
    }
    else {
        res.status(404).send({ message: 'Product Not Found' });
    }
}));
//Delete user from database by Admin only
exports.DeleteProduct = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.ProductModel.findById(req.params.id);
    if (product) {
        yield product_model_1.ProductModel.deleteOne();
        res.send({ message: "Product Deleted" });
    }
    else {
        res.status(404).send({ message: "Product Not Found" });
    }
}));
//search by filter
exports.SearchByFilter = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req;
    const page = query.page || 1;
    const pageSize = query.pageSize || query.PAGE_SIZE;
    const brand = query.brand || '';
    const size = query.size || '';
    const searchQuery = query.query || '';
    const queryFilter = searchQuery && searchQuery !== 'all'
        ? {
            name: {
                $regex: searchQuery,
                $options: 'i',
            },
        }
        : {};
    const brandFilter = brand && brand !== 'all' ? { brand } : {};
    const sizeFilter = size && size !== 'all' ? { size } : {};
    const products = yield product_model_1.ProductModel.find(Object.assign(Object.assign(Object.assign({}, queryFilter), brandFilter), sizeFilter))
        .skip(pageSize * (page - 1))
        .limit(pageSize);
    const countProducts = yield product_model_1.ProductModel.countDocuments(Object.assign(Object.assign(Object.assign({}, queryFilter), brandFilter), sizeFilter));
    res.send({
        products,
        countProducts,
        page,
        //pages: Math.ceil(countProducts / pageSize),
    });
}));
