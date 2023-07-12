import  express, {Request, Response} from 'express'
import {isAdmin} from '../middleware/verifyAdmin'
import {verifyUser} from '../middleware/verifyUserAuthencity'
import upload from "../middleware/multer"
import {AddProduct, DeleteProduct, EditProductDetails, GetAProduct, GetAllProducts, SearchByFilter} from '../controllers/products.controllers'
export const productRouter = express.Router()

//Get all products
productRouter.get('/', GetAllProducts)

//Search for product by filter
productRouter.get('/search', SearchByFilter)

//Get a product
productRouter.get('/:id', GetAProduct)


//Add Product by Admin only
productRouter.post('/', verifyUser, isAdmin, upload.single("image"), AddProduct)
      
//Edit Product by Admin only
productRouter.patch('/:id',verifyUser, isAdmin, upload.single("image"), EditProductDetails)

//Delete Product by Admin only
productRouter.delete('/:id', verifyUser, isAdmin, DeleteProduct)

 