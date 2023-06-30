import express, {Request, Response} from 'express'
export const paymentRouter = express.Router()

paymentRouter.get('/paystack', (req:Request, res:Response) =>{
    res.send({clientId: process.env.PAYSTACK_CLIENT_ID})
})