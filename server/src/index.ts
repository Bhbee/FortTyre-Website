//require("dotenv").config();
import express  from 'express';
import mongoose, { Mongoose } from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const app = express()
const PORT = process.env.PORT || 5000;


//middlewares

app.use(cors({
    credentials:true
})); 
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());


//connect to database

//connectDb();
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
const MONGO_URL = 'mongodb+srv://Bhbee:Bhbee23@forttyre.xa6gehz.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(MONGO_URL)
mongoose.connection.on('error', (error: Error)=>{
    console.log(error)
})


// mongoose.connection.once('open', ()=> {
//     console.log('connected to mongodb');
//     app.listen(PORT, () => {
//         console.log(`Server running on port ${PORT}`);
//     });
// })
// mongoose.connection.on('error', (error: Error)=>{
//     console.log(error)
// })

