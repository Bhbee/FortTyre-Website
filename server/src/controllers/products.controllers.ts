import  express, { Request, Response} from 'express'
import asyncHandler from 'express-async-handler'
import { Product, ProductModel } from '../models/product.model'

export const userRouter = express.Router()
const productsPerPage: number = 8;
//Get All Products
export const GetAllProducts = asyncHandler(async (req: Request, res: Response) =>{
    const { query } = req;
    const page: any = query.page || 1;
    const pageSize: any = query.pageSize || query.PAGE_SIZE;

    const products = await ProductModel
      .find()
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    const countProducts = await ProductModel.countDocuments();
    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / productsPerPage),
  })
})

//Add Product by admin only
export const AddProduct = asyncHandler(async (req: Request, res: Response) =>{
  let findProduct = await ProductModel.findOne({brand: req.body.brand})
  const findProductSize = await ProductModel.findOne({size: req.body.size})
  if(findProduct && findProductSize){
    res.send("Product alreaddy exists. You might want to consider updating the existing product")
  }
  else{
    const product = await ProductModel.create({
      brand: req.body.brand,
      size: req.body.size,
      price: req.body.price,
      image: req.body.image,
      countInStock: req.body.countInStock,
      
    } as Product)
    res.json({
      _id: product.id,
      brand: product.brand,
      size: product.size,
      price: product.price,
      image: product.image,
      countInStock: product.countInStock,
    })
  }
})

//Edit Product
export const EditProductDetails = asyncHandler(async (req: Request, res: Response) =>{
    const productId = req.params.id;
      const product = await ProductModel.findById(productId);
      if (product) {
        product.price = req.body.price;
        product.image = req.body.image;
        product.size = req.body.size;
        product.brand = req.body.brand;
        product.countInStock = req.body.countInStock;
        await product.save();
        res.send({ message: 'Product Updated' });
      } else {
        res.status(404).send({ message: 'Product Not Found' });
      }
  })


//Delete user from database by Admin only
export const DeleteProduct = asyncHandler(async (req: Request, res: Response) =>{
      const product = await ProductModel.findById(req.params.id);
      if (product) {
        await ProductModel.deleteOne()
        res.send({ message: "Product Deleted" });
      } else {
        res.status(404).send({ message: "Product Not Found" });
      }
})

//search by filter
export const SearchByFilter = asyncHandler(async (req: Request, res: Response) =>{
    const { query } = req;
    const page: any = query.page || 1;
    const pageSize: any = query.pageSize || query.PAGE_SIZE;
    const brand = query.brand || '';
    const size = query.size || '';
    const searchQuery = query.query || '';

    const queryFilter =
      searchQuery && searchQuery !== 'all'
        ? {
            name: {
              $regex: searchQuery,
              $options: 'i',
            },
          }
        : {};
    const brandFilter = brand && brand !== 'all' ? { brand } : {};
    const sizeFilter = size && size !== 'all' ? { size} : {};

    const products = await ProductModel.find({
      ...queryFilter,
      ...brandFilter,
      ...sizeFilter,
    })
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    const countProducts = await ProductModel.countDocuments({
      ...queryFilter,
      ...brandFilter,
      ...sizeFilter,
    });
    res.send({
      products,
      countProducts,
      page,
      //pages: Math.ceil(countProducts / pageSize),
    });
  })