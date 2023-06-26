"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = __importDefault(require("express"));
const verifyAdmin_1 = require("../middleware/verifyAdmin");
const verifyUserAuthencity_1 = require("../middleware/verifyUserAuthencity");
const products_controllers_1 = require("../controllers/products.controllers");
exports.productRouter = express_1.default.Router();
//Get all products
exports.productRouter.get('/', products_controllers_1.GetAllProducts);
//Search for product by filter
exports.productRouter.get('/search', products_controllers_1.SearchByFilter);
//Add Product by Admin only
exports.productRouter.post('/', verifyUserAuthencity_1.verifyUser, verifyAdmin_1.isAdmin, products_controllers_1.AddProduct);
//Edit Product by Admin only
exports.productRouter.patch('/:id', verifyUserAuthencity_1.verifyUser, verifyAdmin_1.isAdmin, products_controllers_1.EditProductDetails);
//Delete Product by Admin only
exports.productRouter.delete('/:id', verifyUserAuthencity_1.verifyUser, verifyAdmin_1.isAdmin, products_controllers_1.DeleteProduct);
// productRouter.get('/categories',asyncHandler(async (req:Request, res: Response) => {
//       const categories = await ProductModel.find().distinct('category')
//       res.json(categories)
//     })
//   )
// //api/slug/....
// productRouter.get('/slug/:slug', asyncHandler(async (req, res) =>{
//     const product = await ProductModel.findOne({ slug: req.params.slug})
//     if(product){
//         res.json(product)
//     } else {
//         res.status(404).json({message: 'Product Not Found'})
//     }
// }))
