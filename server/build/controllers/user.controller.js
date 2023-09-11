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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePersonalUserInfo = exports.DeleteUSer = exports.GetUserProfile = exports.GetMyProfile = exports.GetAllUserInfo = exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = require("../models/user.model");
const order_model_1 = require("../models/order.model");
exports.userRouter = express_1.default.Router();
//Get all user: By Admin only
exports.GetAllUserInfo = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.UserModel.find({}).lean();
    const usersWithoutPassword = users.map((_a) => {
        var { password } = _a, user = __rest(_a, ["password"]);
        return user;
    });
    res.send(usersWithoutPassword);
}));
//Get my profile
exports.GetMyProfile = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const currentUser = req.user;
    if (id !== currentUser._id) {
        res.status(403).send({ message: "Access denied" });
        return;
    }
    else {
        const user = yield user_model_1.UserModel.findById(req.params.id).lean();
        const orders = yield order_model_1.OrderModel.find({ user: currentUser._id });
        if (user) {
            const { password } = user, userWithoutPassword = __rest(user, ["password"]);
            res.send({
                userWithoutPassword,
                orders
            });
        }
        else {
            res.status(404).send({ message: "User Not Found" });
        }
    }
}));
//Get user's profile  by Admin only
exports.GetUserProfile = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userFound = yield user_model_1.UserModel.findById(id).lean();
    const orders = yield order_model_1.OrderModel.find({ user: userFound === null || userFound === void 0 ? void 0 : userFound._id });
    if (userFound) {
        const { password } = userFound, userWithoutPassword = __rest(userFound, ["password"]);
        res.send({
            userWithoutPassword,
            orders
        });
    }
    else {
        res.status(404).send({ message: "User Not Found" });
    }
}));
//Delete user from database by Admin only
exports.DeleteUSer = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.UserModel.findById(req.params.id);
    if (user) {
        if (user.isAdmin === true) {
            res.status(400).send({ message: "Can Not Delete Admin User" });
            return;
        }
        yield user_model_1.UserModel.deleteOne();
        res.send({ message: "User Deleted" });
    }
    else {
        res.status(404).send({ message: "User Not Found" });
    }
}));
exports.UpdatePersonalUserInfo = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const currentUser = req.user._id;
    if (id !== currentUser) {
        res.status(403).send({ message: "Access denied" });
        return;
    }
    else {
        const salt = yield bcryptjs_1.default.genSalt(12);
        const user = yield user_model_1.UserModel.findById(currentUser);
        if (user) {
            if (req.body.password) {
                user.password = bcryptjs_1.default.hashSync(req.body.password, salt);
            }
            user.first_name = req.body.first_name || user.first_name;
            user.last_name = req.body.last_name || user.last_name;
            user.email = req.body.email || user.email;
            user.phone_number = req.body.phone_number || user.phone_number;
            const updatedUser = yield user.save();
            res.send({
                _id: updatedUser._id,
                first_name: updatedUser.first_name,
                last_name: updatedUser.last_name,
                email: updatedUser.email,
                phone_number: updatedUser.phone_number,
            });
        }
        else {
            res.status(404).send({ message: "User not found" });
        }
    }
}));
