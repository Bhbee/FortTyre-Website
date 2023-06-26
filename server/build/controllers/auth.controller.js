"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRefreshToken = exports.Register = exports.Login = exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_utils_1 = require("../utils/jwt.utils");
const user_model_1 = require("../models/user.model");
exports.userRouter = express_1.default.Router();
const JWT_SECRET = process.env.JWT_SECRET;
//Login
exports.Login = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const findUser = yield user_model_1.UserModel.findOne({ email: req.body.email });
    //if(!req.body.email || !req.body.password) res.send("Please fill all fields")
    if (findUser && bcryptjs_1.default.compareSync(req.body.password, findUser.password)) {
        findUser.refreshToken = (0, jwt_utils_1.generateRefreshToken)(findUser);
        const updatedUser = yield findUser.save();
        res.cookie("refreshToken", findUser.refreshToken, {
            httpOnly: true, maxAge: 72 * 60 * 60 * 1000
        });
        res.send({
            email: findUser.email,
            isAdmin: findUser.isAdmin,
            accessToken: (0, jwt_utils_1.generateToken)(findUser)
        });
    }
    else {
        res.status(401).send({ message: "incorrect Email or Password" });
    }
}));
//Register
exports.Register = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const findUser = yield user_model_1.UserModel.findOne({ email: req.body.email });
    const findUserPhone = yield user_model_1.UserModel.findOne({ phone_number: req.body.phone_number });
    if (!findUser && !findUserPhone) {
        const salt = yield bcryptjs_1.default.genSalt(12);
        const user = yield user_model_1.UserModel.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone_number: req.body.phone_number,
            password: bcryptjs_1.default.hashSync(req.body.password, salt)
        });
        res.send({
            _id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone_number: user.phone_number,
            isAdmin: user.isAdmin,
            accessToken: (0, jwt_utils_1.generateToken)(user)
        });
    }
    else if (findUserPhone) {
        res.status(401).send({ message: "This phone number has been registered by another user" });
    }
    else {
        res.status(401).send({ message: "This email address has been registered by another user" });
    }
}));
// Handle Refresh Token
function handleRefreshToken() {
    (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
        const cookie = req.cookies;
        if (!(cookie === null || cookie === void 0 ? void 0 : cookie.refreshToken))
            res.send("No refresh token in cookies");
        const refreshToken = cookie.refreshToken;
        const User = yield user_model_1.UserModel.findOne({ refreshToken });
        if (!User)
            res.send("Refresh Token does not match");
        jsonwebtoken_1.default.verify(refreshToken, JWT_SECRET, (err, decoded) => {
            // if (err || User.id !== decoded.id ) res.send ("There is an issue with the refresh token")
            // const accessToken = generateToken(User?._id)
            // res.json(accessToken)
        });
    }));
}
exports.handleRefreshToken = handleRefreshToken;
