"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
const verifyUser = (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization === null || authorization === void 0 ? void 0 : authorization.startsWith('Bearer')) {
        const accessToken = authorization.slice(7, authorization.length);
        try {
            const decode = jsonwebtoken_1.default.verify(accessToken, JWT_SECRET);
            req.user = decode;
            next();
        }
        catch (error) {
            res.send("session time out");
        }
    }
    else {
        res.status(403).send({ message: "Please login" });
    }
};
exports.verifyUser = verifyUser;
