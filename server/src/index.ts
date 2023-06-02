require("dotenv").config();
import express  from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

//import config from 'config';
import log from './logger'
import router from './routes';
import dbConnect from './config/dbConnect';
import deserializeUser from './middleware/deserializeUser';


const app = express()
const PORT = process.env.PORT;


//middlewares

// app.use(cors({
//     credentials:true
// })); 
// app.use(compression());
// app.use(cookieParser());
// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(router);
app.use(deserializeUser);

//connect to database

app.listen(PORT, () => {
   log.info(`Server running on port ${PORT}`);

   dbConnect();
});
























// const MONGO_URL = 'mongodb+srv://Bhbee:Bhbee23@forttyre.xa6gehz.mongodb.net/?retryWrites=true&w=majority'
// mongoose.connect(MONGO_URL)
// mongoose.connection.on('error', (error: Error)=>{
//     console.log(error)
// })


// mongoose.connection.once('open', ()=> {
//     console.log('connected to mongodb');
//     app.listen(PORT, () => {
//         console.log(`Server running on port ${PORT}`);
//     });
// })
// mongoose.connection.on('error', (error: Error)=>{
//     console.log(error)
// })

