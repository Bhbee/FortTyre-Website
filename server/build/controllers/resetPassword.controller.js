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
const mailHandler_1 = __importDefault(require("../utils/mailHandler"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const user_model_1 = require("../models/user.model");
const generateResetPasswordHtml_1 = require("../utils/generateResetPasswordHtml");
const joi_1 = __importDefault(require("joi"));
//Get reset-password link
const pKey = process.env.privateKey;
const baseUrl = process.env.baseUrl;
exports.forgotPassword = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = joi_1.default.object({ email: joi_1.default.string().email().required() });
    const { error, value } = schema.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    }
    else {
        const user = yield user_model_1.UserModel.findOne({ email: req.body.email });
        const secret = pKey + (user === null || user === void 0 ? void 0 : user.phone_number);
        if (user) {
            const token = jsonwebtoken_1.default.sign({
                sub: user._id,
                email: user.email,
            }, secret, { expiresIn: '1h' });
            //reset link
            const link = `${baseUrl}/auth/reset-password/${user.id}/${token}`;
            const mailHandler = new mailHandler_1.default();
            mailHandler.sendEmail(user.email, 'Password Reset', (0, generateResetPasswordHtml_1.generateTemplate)(link), (error, info) => {
                if (error) {
                    res.status(500).json({ error: 'An error occurred while sending the email.' });
                }
                else {
                    res.status(200).json({ message: 'Email sent successfully!', response: info === null || info === void 0 ? void 0 : info.response });
                }
            });
        }
        else {
            res.status(404).send({ message: 'User not found' });
        }
    }
}));
exports.passwordReset = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = joi_1.default.object({ password: joi_1.default.string().min(8).max(36)
            .pattern(new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$'))
            .required()
            .messages({ 'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
        }), });
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    }
    const salt = yield bcryptjs_1.default.genSalt(12);
    const { id, token } = req.params;
    try {
        const user = yield user_model_1.UserModel.findOne({ _id: id });
        const secret = pKey + (user === null || user === void 0 ? void 0 : user.phone_number);
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        if (user) {
            if (req.body.password) {
                user.password = bcryptjs_1.default.hashSync(req.body.password, salt);
                yield user.save();
                res.send({ message: 'Password reset successful' });
                return;
            }
        }
        res.send({ message: 'User not found ' });
    }
    catch (error) {
        res.status(401).send({ message: 'Invalid Token' });
    }
}));
