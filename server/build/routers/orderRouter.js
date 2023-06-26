"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = __importDefault(require("express"));
const verifyUserAuthencity_1 = require("../middleware/verifyUserAuthencity");
const verifyAdmin_1 = require("../middleware/verifyAdmin");
const order_controller_1 = require("../controllers/order.controller");
exports.orderRouter = express_1.default.Router();
//get all orders by admin only
exports.orderRouter.get('/', verifyUserAuthencity_1.verifyUser, verifyAdmin_1.isAdmin, order_controller_1.GetAllOrders);
//summary of monthly sales/orders by Admin only
exports.orderRouter.get('/summary', verifyUserAuthencity_1.verifyUser, verifyAdmin_1.isAdmin, order_controller_1.summaryOfSales);
//Delete order by admin only
exports.orderRouter.delete('/:id', verifyUserAuthencity_1.verifyUser, verifyAdmin_1.isAdmin, order_controller_1.DeleteOrder);
//get all orders of current user
exports.orderRouter.get('/my-order', verifyUserAuthencity_1.verifyUser, order_controller_1.GetAllOrdersOfUser);
//Place an order
exports.orderRouter.post('/', verifyUserAuthencity_1.verifyUser, order_controller_1.PlaceOrder);
//Get Order details
exports.orderRouter.get('/:id', verifyUserAuthencity_1.verifyUser, order_controller_1.GetOrderDetails);
//Update order payment details
exports.orderRouter.put('/:id/pay', verifyUserAuthencity_1.verifyUser, order_controller_1.UpdateOrderPaymentDetails);
//Order delivery status update
exports.orderRouter.put('/:id/deliver', verifyUserAuthencity_1.verifyUser, verifyAdmin_1.isAdmin, order_controller_1.UpdateDeliverystatus);
