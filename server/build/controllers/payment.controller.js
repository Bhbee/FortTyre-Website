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
exports.VerifyPayment = exports.PayWithPaystack = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const https_1 = __importDefault(require("https"));
const order_model_1 = require("../models/order.model");
const payment_model_1 = require("../models/payment.model");
const mailHandler_1 = __importDefault(require("../utils/mailHandler"));
//Payment initialization with a callback to verify payment(using paystack)
exports.PayWithPaystack = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.OrderModel.findById(req.params.id).populate('user');
    const user = order === null || order === void 0 ? void 0 : order.user;
    const email = user.email;
    const first_name = user.first_name;
    const last_name = user.last_name;
    const id = req.params.id;
    const baseUrl = process.env.baseUrl;
    const paymentVerificationUrl = `${baseUrl}/orders/pay/verify/${id}`; //edit later to hosted base url
    const params = JSON.stringify({
        "email": email,
        "first_name": first_name,
        "last_name": last_name,
        "amount": (order === null || order === void 0 ? void 0 : order.totalPrice) * 100,
        "callback_url": paymentVerificationUrl
    });
    const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: '/transaction/initialize',
        method: 'POST',
        headers: {
            Authorization: process.env.PUBLIC_KEY,
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        }
    };
    // client request to paystack API
    const clientReq = https_1.default.request(options, apiRes => {
        let data = '';
        apiRes.on('data', (chunk) => {
            data += chunk;
        });
        apiRes.on('end', () => {
            const responseData = JSON.parse(data);
            return res.status(200).json(responseData);
        });
    }).on('error', error => {
        return res.status(500).json({ error: 'An error occurred' });
    });
    clientReq.write(params);
    clientReq.end();
}));
//verify payment and update order payment details
exports.VerifyPayment = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reference = req.query.reference; //get from client
    // Set up options for the HTTPS request to the Paystack API
    const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: `/transaction/verify/${reference}`,
        method: 'GET',
        headers: {
            Authorization: process.env.PUBLIC_KEY,
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        },
    };
    // Send the request to the Paystack API
    const clientReq = https_1.default.request(options, apiRes => {
        let data = '';
        apiRes.on('data', (chunk) => {
            data += chunk;
        });
        apiRes.on('end', () => __awaiter(void 0, void 0, void 0, function* () {
            const responseData = JSON.parse(data);
            if (responseData.data.gateway_response === "Successful") {
                //1. Add new payment to database
                const payment = yield payment_model_1.PaymentModel.create({
                    order: req.params.id,
                    email: responseData.data.customer.email,
                    amount: responseData.data.amount / 100,
                    reference: responseData.data.reference,
                    status: responseData.data.status
                });
                //2. update order's payment Result
                const order = yield order_model_1.OrderModel.findById(req.params.id);
                if (order) {
                    order.paymentInfo = payment._id;
                    order.isPaid = true;
                    order.paidAt = new Date(Date.now());
                    const updatedOrder = yield order.save();
                    res.send({ message: "Order payment Updated", order: updatedOrder });
                    //Show fort tyre updated order page 
                }
                else {
                    res.status(404).send({ message: "Order does not exist" });
                }
                //3. Send receipt as an email to payer
                const mailHandler = new mailHandler_1.default();
                mailHandler.sendEmail(responseData.data.customer.email, 'Payment Successful Notification', `<h1>Hi, Thanks for shopping with us.</h1>
          <p>Hi, We have finished processing your order. Your transaction of ${responseData.data.amount / 100}naira to  Fort Tyre was successful!</p> 
          `, (error, info) => {
                    if (error) {
                        res.status(500).json({ error: 'An error occurred while sending the email.' });
                    }
                    else {
                        res.status(200).json({ message: 'Email sent successfully!', response: info === null || info === void 0 ? void 0 : info.response });
                    }
                });
            }
            else {
                res.send({ message: "Payment not succesful" });
            }
        }));
    });
    clientReq.on('error', (error) => {
        console.log(error);
        return res.status(500).json({ error: 'An error occurred' });
    });
    clientReq.end();
}));
