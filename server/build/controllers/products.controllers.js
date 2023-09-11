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
exports.SearchByFilter = exports.DeleteProduct = exports.EditProductDetails = exports.AddProduct = exports.GetAllProducts = exports.GetAProduct = exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const product_model_1 = require("../models/product.model");
exports.userRouter = express_1.default.Router();
const productsPerPage = 8;
//Get a Product
exports.GetAProduct = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    const product = yield product_model_1.ProductModel.findById(productId);
    if (product) {
        res.send(product);
    }
    else {
        res.status(404).send({ message: 'Product Not Found' });
    }
}));
//Get All Products
exports.GetAllProducts = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req;
    const page = query.page || 1;
    const pageSize = query.pageSize || query.PAGE_SIZE || 10;
    const products = yield product_model_1.ProductModel
        .find()
        .skip(pageSize * (page - 1))
        .limit(pageSize);
    const countProducts = yield product_model_1.ProductModel.countDocuments();
    res.status(200).send({
        products,
        countProducts,
        page,
        pages: Math.ceil(countProducts / productsPerPage),
    });
}));
//Add Product by admin only
const AddProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { brand, size, price, countInStock } = req.body;
    const imageFile = req.file;
    try {
        let findProduct = yield product_model_1.ProductModel.findOne({ brand: req.body.brand });
        const findProductSize = yield product_model_1.ProductModel.findOne({ size: req.body.size });
        if (findProduct && findProductSize) {
            return res.send('Product already exists. You might want to consider updating the existing product');
        }
        if (!imageFile) {
            return res.status(400).send({ message: 'Image file is missing' });
        }
        const uploadResponse = yield cloudinary_1.default.uploader.upload(imageFile.path, {
            resource_type: 'image',
            upload_preset: 'forttyres-product-images'
        });
        if (!uploadResponse) {
            return res.status(400).send({ message: 'Image upload failed' });
        }
        const product = yield product_model_1.ProductModel.create({
            brand: brand.toUpperCase,
            size: size,
            price: price,
            image: {
                url: uploadResponse.secure_url,
                public_id: uploadResponse.public_id
            },
            countInStock: countInStock
        });
        res.status(201).send({ message: 'Product Added Successfully' });
    }
    catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});
exports.AddProduct = AddProduct;
//Edit Product
exports.EditProductDetails = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    const { brand, size, price, countInStock } = req.body;
    const imageFile = req.file;
    const product = yield product_model_1.ProductModel.findById(productId);
    if (product) {
        if (imageFile) {
            const uploadResponse = yield cloudinary_1.default.uploader.upload(imageFile.path, {
                resource_type: 'image',
                upload_preset: 'forttyres-product-images'
            });
            yield cloudinary_1.default.uploader.destroy(product.image.public_id);
            product.image = {
                url: uploadResponse.secure_url,
                public_id: uploadResponse.public_id
            };
        }
        product.price = price;
        product.size = size;
        product.brand = brand.toUpperCase();
        product.countInStock = countInStock;
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
        if (product.image && product.image.public_id) {
            yield cloudinary_1.default.uploader.destroy(product.image.public_id);
        }
        yield product_model_1.ProductModel.deleteOne({ _id: product._id });
        res.send({ message: "Product Deleted" });
    }
    else {
        res.status(404).send({ message: "Product Not Found" });
    }
}));
//search by filter
exports.SearchByFilter = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req;
    const page = Number(query.page) || 1;
    const pageSize = query.pageSize || query.PAGE_SIZE;
    const brand = (query.brand || '').toUpperCase();
    const size = (query.size || '');
    const searchQuery = query.query || '';
    const queryFilter = searchQuery && searchQuery !== 'all'
        ? {
            brand: {
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
    });
}));
