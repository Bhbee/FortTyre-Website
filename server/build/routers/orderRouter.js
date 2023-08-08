"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = __importDefault(require("express"));
const verifyUserAuthencity_1 = require("../middleware/verifyUserAuthencity");
const verifyAdmin_1 = require("../middleware/verifyAdmin");
const isLoggedIn_1 = require("../middleware/isLoggedIn");
const payment_controller_1 = require("../controllers/payment.controller");
const order_controller_1 = require("../controllers/order.controller");
exports.orderRouter = express_1.default.Router();
//Place an order
exports.orderRouter.post('/', verifyUserAuthencity_1.verifyUser, order_controller_1.PlaceOrder);
//get all orders by admin only
exports.orderRouter.get('/', verifyUserAuthencity_1.verifyUser, verifyAdmin_1.isAdmin, order_controller_1.GetAllOrders);
//summary of monthly sales/orders by Admin only
exports.orderRouter.get('/summary', verifyUserAuthencity_1.verifyUser, verifyAdmin_1.isAdmin, order_controller_1.summaryOfSales);
//get all orders of current user
exports.orderRouter.get('/my-order', (isLoggedIn_1.isLoggedIn || verifyUserAuthencity_1.verifyUser), order_controller_1.GetAllOrdersOfUser);
//Delete order by admin only
exports.orderRouter.delete('/:id', verifyUserAuthencity_1.verifyUser, verifyAdmin_1.isAdmin, order_controller_1.DeleteOrder);
//Get Order details
exports.orderRouter.get('/:id', verifyUserAuthencity_1.verifyUser, order_controller_1.GetOrderDetails);
// make payment for order placed
exports.orderRouter.post('/:id/pay', payment_controller_1.PayWithPaystack);
//Update order payment details
exports.orderRouter.get('/pay/verify/:id', payment_controller_1.VerifyPayment);
//Order delivery status update
exports.orderRouter.put('/:id/deliver', verifyUserAuthencity_1.verifyUser, verifyAdmin_1.isAdmin, order_controller_1.UpdateDeliverystatus);
