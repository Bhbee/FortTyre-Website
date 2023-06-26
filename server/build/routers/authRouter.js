"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const resetPassword_controller_1 = require("../controllers/resetPassword.controller");
exports.authRouter = express_1.default.Router();
//Login
exports.authRouter.post('/signin', auth_controller_1.Login);
//Registration
exports.authRouter.post('/sign-up', auth_controller_1.Register);
//Refresh token
exports.authRouter.get("/refresh", auth_controller_1.handleRefreshToken);
//Forgot Password? Get reset-password link
exports.authRouter.post("/forget-password", resetPassword_controller_1.forgotPassword);
//Reset password
exports.authRouter.post("/reset-password", resetPassword_controller_1.passwordReset);
