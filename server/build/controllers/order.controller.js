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
exports.DeleteOrder = exports.UpdateDeliverystatus = exports.PlaceOrder = exports.GetOrderDetails = exports.summaryOfSales = exports.GetAllOrdersOfUser = exports.GetAllOrders = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const order_model_1 = require("../models/order.model");
const user_model_1 = require("../models/user.model");
//get all orders
exports.GetAllOrders = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_model_1.OrderModel.find();
    res.json(orders);
}));
//get all orders of current user
exports.GetAllOrdersOfUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_model_1.OrderModel.find({ user: req.user._id });
    res.json(orders);
}));
//Summary of sales per month
exports.summaryOfSales = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_model_1.OrderModel.aggregate([
        {
            $group: {
                _id: null,
                numOfOrders: { $sum: 1 },
                totalSales: { $sum: '$totalPrice' },
            },
        },
    ]);
    const users = yield user_model_1.UserModel.aggregate([
        {
            $group: {
                _id: null,
                numOfUsers: { $sum: 1 },
            },
        },
    ]);
    const monthlyOrders = yield order_model_1.OrderModel.aggregate([
        {
            $group: {
                _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
                orders: { $sum: 1 },
                sales: { $sum: '$totalPrice' },
            },
        },
        { $sort: { _id: 1 } },
    ]);
    res.send({ users, orders, monthlyOrders });
}));
//Get a particular Order details or summary
exports.GetOrderDetails = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.OrderModel.findById(req.params.id);
    if (order) {
        res.send(order);
    }
    else {
        res.status(404).send({ message: "Order does not exist" });
    }
}));
//Place an order
exports.PlaceOrder = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    console.log(user._id);
    if (req.body.orderItems.length === 0) {
        res.status(400).json({ message: "Cart is Empty" });
    }
    else {
        const createOrder = yield order_model_1.OrderModel.create({
            user: req.user._id,
            orderItems: req.body.orderItems.map((x) => (Object.assign(Object.assign({}, x), { product: x._id }))),
            deliveryAddress: req.body.deliveryAddress,
            itemPrice: req.body.itemPrice,
            deliveryPrice: req.body.deliveryPrice,
            totalPrice: req.body.totalPrice
        });
        //res.send(req.user)
        res.status(201).json({ message: "Order Created", order: createOrder });
    }
}));
//Order delivery status update
exports.UpdateDeliverystatus = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.OrderModel.findById(req.params.id);
    if (order) {
        order.isDelivered = true;
        order.deliveredAt = new Date(Date.now());
        const updatedOrder = yield order.save();
        res.send({ message: 'Order Delivered', order: updatedOrder });
    }
    else {
        res.status(404).send({ message: 'Order Not Found' });
    }
}));
//Delete order
exports.DeleteOrder = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.OrderModel.findById(req.params.id);
    if (order) {
        const deleteOrder = yield order.deleteOne();
        res.send({ message: 'Order Deleted', order: deleteOrder });
    }
    else {
        res.status(404).send({ message: 'Order Not Found' });
    }
}));
