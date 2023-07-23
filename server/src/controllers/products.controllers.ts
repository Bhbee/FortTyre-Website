import  express, { Request, Response} from 'express'
import asyncHandler from 'express-async-handler'

import cloudinary from '../utils/cloudinary'
import { Product, ProductModel } from '../models/product.model'

export const userRouter = express.Router()
const productsPerPage: number = 8;

//Get a Product
export const GetAProduct = asyncHandler(async (req: Request, res: Response) =>{
  const productId = req.params.id;
  const product = await ProductModel.findById(productId);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
})

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
    res.status(200).send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / productsPerPage),
  })
})

//Add Product by admin only
export const AddProduct = async (req: Request, res: Response) => {
  const { brand, size, price, countInStock } = req.body;
  const imageFile = req.file;

  try {
    let findProduct = await ProductModel.findOne({ brand: req.body.brand });
    const findProductSize = await ProductModel.findOne({ size: req.body.size });
    if (findProduct && findProductSize) {
      return res.send('Product already exists. You might want to consider updating the existing product');
    }
    if (!imageFile) {
      return res.status(400).send({ message: 'Image file is missing' });
    }
    const uploadResponse = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: 'image',
      upload_preset: 'forttyres-product-images'
    });

    if (!uploadResponse) {
      return res.status(400).send({ message: 'Image upload failed' });
    }
    const product = await ProductModel.create({
      brand: brand,
      size: size,
      price: price,
      image: {
        url: uploadResponse.secure_url,
        public_id: uploadResponse.public_id
      },
      countInStock: countInStock
    });
    res.status(201).send({ message: 'Product Added Successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

//Edit Product
export const EditProductDetails = asyncHandler(async (req: Request, res: Response) =>{
    const productId = req.params.id;
    const imageFile = req.file;
    const product = await ProductModel.findById(productId);
    if (product) {
      if(imageFile){
        const uploadResponse = await cloudinary.uploader.upload(imageFile.path, {
          resource_type: 'image',
          upload_preset: 'forttyres-product-images'
        });
        await cloudinary.uploader.destroy(product.image.public_id);
        product.image ={
          url: uploadResponse.secure_url,
          public_id: uploadResponse.public_id
        }
      }
      product.price = req.body.price
      product.size = req.body.size
      product.brand = req.body.brand
      product.countInStock = req.body.countInStock
      await product.save()
      res.send({ message: 'Product Updated' });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
})


//Delete user from database by Admin only
export const DeleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await ProductModel.findById(req.params.id);
  if (product) {
    if (product.image && product.image.public_id) {
      await cloudinary.uploader.destroy(product.image.public_id)
    }
    await ProductModel.deleteOne({ _id: product._id })
    res.send({ message: "Product Deleted" });
  } else {
    res.status(404).send({ message: "Product Not Found" })
  }
});


//search by filter
export const SearchByFilter = asyncHandler(async (req: Request, res: Response) =>{
    const { query } = req;
    const page = Number(query.page) || 1;
    const pageSize: any = query.pageSize || query.PAGE_SIZE;
    const brand = (query.brand || '') as string
    const size = (query.size || '') as string
    const searchQuery = query.query || '';

    const queryFilter =
      searchQuery && searchQuery !== 'all'
        ? {
            brand: {
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
    });
  })