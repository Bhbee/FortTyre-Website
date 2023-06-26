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
exports.GetUserProfile = exports.UpdatePersonalUserInfo = exports.DeleteUSer = exports.UpdateIUserInfoByAdmin = exports.GetAllUserInfo = exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_utils_1 = require("../utils/jwt.utils");
const user_model_1 = require("../models/user.model");
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
//update user info by Admin only
exports.UpdateIUserInfoByAdmin = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.UserModel.findById(req.params.id);
    if (user) {
        user.first_name = req.body.first_name;
        user.last_name = req.body.last_name;
        user.email = req.body.email;
        user.phone_number = req.body.phone_number;
        user.isAdmin = Boolean(req.body.isAdmin);
        const updatedUser = yield user.save();
        res.send({ message: "User Updated", user: updatedUser });
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
//to do laterchange password
//update personal user details i.e can only be done by owner of account
exports.UpdatePersonalUserInfo = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcryptjs_1.default.genSalt(12);
    const user = yield user_model_1.UserModel.findById(req.user._id);
    if (user) {
        user.first_name = req.body.first_namename || user.first_name;
        user.last_name = req.body.last_namename || user.last_name;
        user.email = req.body.email || user.email;
        user.phone_number = req.body.phone_number || user.phone_number;
        if (req.body.password) {
            user.password = bcryptjs_1.default.hashSync(req.body.password, salt);
        }
        const updatedUser = yield user.save();
        res.send({
            _id: updatedUser._id,
            first_name: updatedUser.first_name,
            last_name: updatedUser.last_name,
            email: updatedUser.email,
            phone_number: updatedUser.phone_number,
            isAdmin: updatedUser.isAdmin,
            accessToken: (0, jwt_utils_1.generateToken)(updatedUser),
        });
    }
    else {
        res.status(404).send({ message: "User not found" });
    }
}));
//Get a user profile by id
exports.GetUserProfile = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const currentUser = req.user;
    if (id !== currentUser._id && !currentUser.isAdmin) {
        res.status(403).send({ message: "Access denied" });
        return;
    }
    else {
        const user = yield user_model_1.UserModel.findById(req.params.id).lean();
        if (user) {
            const { password } = user, userWithoutPassword = __rest(user, ["password"]);
            res.send(userWithoutPassword);
        }
        else {
            res.status(404).send({ message: "User Not Found" });
        }
    }
}));
// export const payOrderEmailTemplate = (order) => {
//   return `<h1>Thanks for shopping with us</h1>
//   <p>
//   Hi ${order.user.name},</p>
//   <p>We have finished processing your order.</p>
//   <h2>[Order ${order._id}] (${order.createdAt.toString().substring(0, 10)})</h2>
//   <table>
//   <thead>
//   <tr>
//   <td><strong>Product</strong></td>
//   <td><strong>Quantity</strong></td>
//   <td><strong align="right">Price</strong></td>
//   </thead>
//   <tbody>
//   ${order.orderItems
//     .map(
//       (item) => `
//       <tr>
//     <td>${item.name}</td>
//     <td align="center">${item.quantity}</td>
//     <td align="right"> $${item.price.toFixed(2)}</td>
//     </tr>
//   `
//     )
//     .join('\n')}
//   </tbody>
//   <tfoot>
//   <tr>
//   <td colspan="2">Items Price:</td>
//   <td align="right"> $${order.itemsPrice.toFixed(2)}</td>
//   </tr>
//   <tr>
//   <td colspan="2">Shipping Price:</td>
//   <td align="right"> $${order.shippingPrice.toFixed(2)}</td>
//   </tr>
//   <tr>
//   <td colspan="2"><strong>Total Price:</strong></td>
//   <td align="right"><strong> $${order.totalPrice.toFixed(2)}</strong></td>
//   </tr>
//   <tr>
//   <td colspan="2">Payment Method:</td>
//   <td align="right">${order.paymentMethod}</td>
//   </tr>
//   </table>
//   <h2>Shipping address</h2>
//   ${order.shippingAddress.fullName},<br/>
//   ${order.shippingAddress.address},<br/>
//   ${order.shippingAddress.city},<br/>
//   ${order.shippingAddress.country},<br/>
//   ${order.shippingAddress.postalCode}<br/>
//   </p>
//   <hr/>
//   <p>
//   Thanks for shopping with us.
//   </p>
//   `;
// };
