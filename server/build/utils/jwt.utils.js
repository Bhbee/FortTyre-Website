"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
const generateToken = (user) => {
    return jsonwebtoken_1.default.sign({
        _id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
    }, JWT_SECRET, { expiresIn: '1d' });
};
exports.generateToken = generateToken;
//Refresh Token
function generateRefreshToken(user) {
    return jsonwebtoken_1.default.sign({
        _id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
    }, JWT_SECRET, { expiresIn: '3d' });
}
exports.generateRefreshToken = generateRefreshToken;
