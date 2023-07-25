require("dotenv").config();
import express, {Request, Response} from 'express'
import cors from 'cors';
import path from 'path'
import cookieParser from 'cookie-parser';
//import { requiresAuth } from 'express-openid-connect'
import dbConnect from './config/dbConnect';
import { productRouter } from './routers/productRouter';
import { userRouter } from './routers/userRouter';
import { orderRouter } from './routers/orderRouter';
import { authRouter } from './routers/authRouter';


const app = express()
const PORT = process.env.PORT;
//const authMiddleware = require('./config/AuthOConfig')

//middlewares
app.use(
   cors({
    credentials:true,
    origin: "*" //["https://forttyres.onrender.com"] //edit to frontend address
})); 
// app.use(authMiddleware)
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended: true, limit:'5mb'}));
app.use(express.static(path.join(__dirname, '../../client')))
// app.get('*', (req:Request, res:Response)=>{
//    res.json("not available")
//    //res.sendFile(path.join(__dirname, '../../client/')) //edit later to 404 page 
// })

//Routers

app.use('/auth', authRouter)
app.use('/users', userRouter)
app.use('/orders', orderRouter)
app.use('/products', productRouter)

dbConnect();
//run server and connect to database
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);

   
});