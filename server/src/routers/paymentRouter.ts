import express, {Request, Response} from 'express'
import { PayWithPaystack, VerifyPayment} from '../controllers/payment.controller'
export const paymentRouter = express.Router()

paymentRouter.post('/pay', PayWithPaystack)
paymentRouter.get('/verify', VerifyPayment)