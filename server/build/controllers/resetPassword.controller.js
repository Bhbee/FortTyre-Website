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
exports.passwordReset = exports.forgotPassword = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const user_model_1 = require("../models/user.model");
//Get reset-password link
const pKey = process.env.privateKey;
exports.forgotPassword = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.UserModel.findOne({ email: req.body.email });
    if (user) {
        const token = jsonwebtoken_1.default.sign({ _id: user._id }, pKey, { expiresIn: '3h', });
        user.resetToken = token;
        yield user.save();
        //reset link
        const link = `https://localhost:3000/reset-password/${token}`;
        //const link = `${baseUrl()}/reset-password/${token}`);
        var transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            auth: {
                user: "samuelchristiana38@gmail.com",
                pass: "lfdeltnqsdtoqbrc"
            }
        });
        var mailOptions = {
            from: "samuelchristiana38@gmail.com",
            to: req.body.email,
            subject: "Password Reset",
            text: link
        };
        res.send({ message: 'We sent reset password link to your email.' });
    }
    else {
        res.status(404).send({ message: 'User not found' });
    }
}));
exports.passwordReset = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcryptjs_1.default.genSalt(12);
    jsonwebtoken_1.default.verify(req.body.token, pKey, (err, decode) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            res.status(401).send({ message: 'Invalid Token' });
        }
        else {
            const user = yield user_model_1.UserModel.findOne({ resetToken: req.body.token });
            if (user) {
                if (req.body.password) {
                    user.password = bcryptjs_1.default.hashSync(req.body.password, salt);
                    yield user.save();
                    res.send({
                        message: 'Password reset successful',
                    });
                }
            }
            else {
                res.status(404).send({ message: 'User not found' });
            }
        }
    }));
}));
