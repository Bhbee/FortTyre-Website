"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const dbConnect_1 = __importDefault(require("./config/dbConnect"));
const productRouter_1 = require("./routers/productRouter");
const userRouter_1 = require("./routers/userRouter");
const orderRouter_1 = require("./routers/orderRouter");
const paymentRouter_1 = require("./routers/paymentRouter");
const uploadImage_1 = require("./routers/uploadImage");
const authRouter_1 = require("./routers/authRouter");
const app = (0, express_1.default)();
const PORT = process.env.PORT;
//middlewares
app.use((0, cors_1.default)({
    credentials: true,
    origin: ["http://localhost3000"]
}));
app.use(express_1.default.json());
//app.use(cookieParser)
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, '../../client')));
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../client/'));
});
//Routers
app.use('/auth', authRouter_1.authRouter);
app.use('/users', userRouter_1.userRouter);
app.use('/orders', orderRouter_1.orderRouter);
app.use('/products', productRouter_1.productRouter);
app.use('/payment', paymentRouter_1.paymentRouter);
app.use('/upload', uploadImage_1.uploadRouter);
(0, dbConnect_1.default)();
//run server and connect to database
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
