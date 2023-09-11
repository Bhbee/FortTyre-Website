"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const passport_1 = __importDefault(require("passport"));
require("../src/config/passport-oauth-setup");
const cookie_session_1 = __importDefault(require("cookie-session"));
const dbConnect_1 = __importDefault(require("./config/dbConnect"));
const productRouter_1 = require("./routers/productRouter");
const userRouter_1 = require("./routers/userRouter");
const orderRouter_1 = require("./routers/orderRouter");
const authRouter_1 = require("./routers/authRouter");
const app = (0, express_1.default)();
const PORT = process.env.PORT;
const key = process.env.cookieSessionKey;
//middlewares
app.use((0, cors_1.default)({
    credentials: true,
    origin: "*" //["https://forttyres.onrender.com"] //edit to frontend address
}));
app.use((0, cookie_session_1.default)({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [key]
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true, limit: '5mb' }));
app.use(express_1.default.static(path_1.default.join(__dirname, '../../client')));
// app.get('*', (req:Request, res:Response)=>{}
//    res.json("not available")
//    //res.sendFile(path.join(__dirname, '../../client/')) //edit later to 404 page 
// })
//Routers
app.use('/auth', authRouter_1.authRouter);
app.use('/users', userRouter_1.userRouter);
app.use('/orders', orderRouter_1.orderRouter);
app.use('/products', productRouter_1.productRouter);
(0, dbConnect_1.default)();
//run server and connect to database
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
