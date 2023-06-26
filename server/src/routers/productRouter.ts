import  express, {Request, Response} from 'express'
import asyncHandler from 'express-async-handler'
import {ProductModel} from '../models/product.model'
import {isAdmin} from '../middleware/verifyAdmin'
import {verifyUser} from '../middleware/verifyUserAuthencity'

import {AddProduct, DeleteProduct, EditProductDetails, GetAllProducts, SearchByFilter} from '../controllers/products.controllers'
export const productRouter = express.Router()

//Get all products
productRouter.get('/', GetAllProducts)

//Search for product by filter
productRouter.get('/search', SearchByFilter)

//Add Product by Admin only
productRouter.post('/', verifyUser, isAdmin, AddProduct)
      
//Edit Product by Admin only
productRouter.patch('/:id',verifyUser, isAdmin, EditProductDetails)

//Delete Product by Admin only
productRouter.delete('/:id', verifyUser, isAdmin, DeleteProduct)

 




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