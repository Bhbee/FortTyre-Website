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
exports.Logout = exports.handleRefreshToken = exports.Register = exports.Login = exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validation_1 = require("../utils/validation");
const jwt_utils_1 = require("../utils/jwt.utils");
const user_model_1 = require("../models/user.model");
exports.userRouter = express_1.default.Router();
const JWT_SECRET = process.env.JWT_SECRET;
//Login
exports.Login = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = (0, validation_1.validateLoginData)(req.body);
    const { email, password } = req.body;
    if (error) {
        res.status(400).send("Invalid Request: " + error.details[0].message);
    }
    else {
        const findUser = yield user_model_1.UserModel.findOne({ email: email });
        if (findUser && bcryptjs_1.default.compareSync(password, findUser.password)) {
            findUser.refreshToken = (0, jwt_utils_1.generateRefreshToken)(findUser);
            yield findUser.save();
            res.cookie("refreshToken", findUser.refreshToken, {
                httpOnly: true, maxAge: 72 * 60 * 60 * 1000
            });
            res.send({
                accessToken: (0, jwt_utils_1.generateToken)(findUser)
            });
        }
        else {
            res.status(401).send({ message: "incorrect Email or Password" });
        }
    }
}));
//Register
exports.Register = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = (0, validation_1.validateRegisterData)(req.body);
    const { first_name, last_name, email, phone_number, password } = req.body;
    if (error) {
        res.status(401).send("Invalid Request: " + error.details[0].message);
    }
    else {
        const findUser = yield user_model_1.UserModel.findOne({ email: req.body.email });
        const findUserPhone = yield user_model_1.UserModel.findOne({ phone_number: req.body.phone_number });
        if (!findUser && !findUserPhone) {
            const salt = yield bcryptjs_1.default.genSalt(12);
            yield user_model_1.UserModel.create({
                first_name: first_name,
                last_name: last_name,
                email: email,
                phone_number: phone_number,
                password: bcryptjs_1.default.hashSync(password, salt)
            });
            res.status(201).send({ message: "Successfully Registered" });
        }
        else if (findUserPhone) {
            res.status(401).send({ message: "This phone number has been registered by another user" });
        }
        else {
            res.status(401).send({ message: "This email address has been registered by another user" });
        }
    }
}));
// Handle Refresh Token
exports.handleRefreshToken = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cookie = req.cookies;
    if (!(cookie === null || cookie === void 0 ? void 0 : cookie.refreshToken)) {
        res.status(401).send({ message: "Please login" });
        return;
    }
    const refreshToken = cookie.refreshToken;
    const UserFound = yield user_model_1.UserModel.findOne({ refreshToken });
    if (!UserFound) {
        res.sendStatus(401);
        return;
    }
    try {
        const decode = jsonwebtoken_1.default.verify(refreshToken, JWT_SECRET);
        req.user = decode;
        res.json({
            accessToken: (0, jwt_utils_1.generateRefreshToken)(UserFound),
        });
    }
    catch (error) {
        res.status(401).send("Invalid refresh token");
    }
}));
exports.Logout = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // req.logout
    const cookie = req.cookies;
    if (!(cookie === null || cookie === void 0 ? void 0 : cookie.refreshToken)) {
        res.sendStatus(204);
        return;
    }
    const refreshToken = cookie.refreshToken;
    const user = yield user_model_1.UserModel.findOne({ refreshToken });
    if (!user) {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true
        });
        res.sendStatus(204);
    }
    yield user_model_1.UserModel.findOneAndUpdate({ refreshToken: refreshToken }, { refreshToken: "" });
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true
    });
    res.sendStatus(204);
}));
