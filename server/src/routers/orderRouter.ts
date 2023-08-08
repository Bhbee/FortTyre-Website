import express from 'express'
import {verifyUser } from '../middleware/verifyUserAuthencity'
import { isAdmin } from '../middleware/verifyAdmin'
import {isLoggedIn} from '../middleware/isLoggedIn'
import { PayWithPaystack, VerifyPayment } from '../controllers/payment.controller'
import {DeleteOrder, GetAllOrders, GetAllOrdersOfUser, GetOrderDetails, PlaceOrder, UpdateDeliverystatus, summaryOfSales} from '../controllers/order.controller'

export const orderRouter = express.Router()

//Place an order
orderRouter.post('/', verifyUser, PlaceOrder)

//get all orders by admin only
orderRouter.get('/', verifyUser, isAdmin, GetAllOrders)

//summary of monthly sales/orders by Admin only
orderRouter.get('/summary', verifyUser, isAdmin, summaryOfSales)

//get all orders of current user
orderRouter.get('/my-order', (isLoggedIn||verifyUser), GetAllOrdersOfUser)

//Delete order by admin only
orderRouter.delete('/:id', verifyUser, isAdmin, DeleteOrder)

//Get Order details
orderRouter.get('/:id', verifyUser, GetOrderDetails)

// make payment for order placed
orderRouter.post('/:id/pay', PayWithPaystack, )

//Update order payment details
orderRouter.get('/pay/verify/:id', VerifyPayment)

//Order delivery status update
orderRouter.put('/:id/deliver', verifyUser, isAdmin, UpdateDeliverystatus)