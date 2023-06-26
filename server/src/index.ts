require("dotenv").config();
import express, {Request, Response} from 'express'
import cors from 'cors';
import path from 'path'

import dbConnect from './config/dbConnect';
import { productRouter } from './routers/productRouter';
import { userRouter } from './routers/userRouter';
import { orderRouter } from './routers/orderRouter';
import { paymentRouter } from './routers/paymentRouter';
import { uploadRouter } from './routers/uploadImage';
import { authRouter } from './routers/authRouter';


const app = express()
const PORT = process.env.PORT;


//middlewares
app.use(
   cors({
    credentials:true,
    origin: ["http://localhost/3000"] //edit to frontend address
})); 
app.use(express.json());
//app.use(cookieParser)
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../../client')))
app.get('*', (req:Request, res:Response)=>{
   res.sendFile(path.join(__dirname, '../../client/'))
})

//Routers

app.use('/auth', authRouter)
app.use('/users', userRouter)
app.use('/orders', orderRouter)
app.use('/products', productRouter)
app.use('/payment', paymentRouter)
app.use('/upload', uploadRouter)

dbConnect();
//run server and connect to database
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);

   
});