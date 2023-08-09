import express, {Request, Response} from 'express'
import asyncHandler from 'express-async-handler'
import { OrderModel } from '../models/order.model'
import { Product, ProductModel } from '../models/product.model'
import { UserModel } from '../models/user.model'

//get all orders
export const GetAllOrders = asyncHandler(async (req: Request, res: Response) =>{
  const orders = await OrderModel.find()
  res.json(orders)
})

//get all orders of current user
export const GetAllOrdersOfUser =  asyncHandler(async (req: Request, res: Response) =>{
  const orders = await OrderModel.find({ user: req.user._id})
  res.json(orders)
})

//Summary of sales per month
export const summaryOfSales = asyncHandler(async (req: Request, res: Response) => {
    const orders = await OrderModel.aggregate([
      {
        $group: {
          _id: null,
          numOfOrders: { $sum: 1 },
          totalSales: { $sum: '$totalPrice' },
        },
      },
    ])
    const users = await UserModel.aggregate([
      {
        $group: {
          _id: null,
          numOfUsers: { $sum: 1 },
        },
      },
    ])
    const monthlyOrders = await OrderModel.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
          orders: { $sum: 1 },
          sales: { $sum: '$totalPrice' },
        },
      },
      { $sort: { _id: 1 } },
    ])
    res.send({ users, orders, monthlyOrders})
})

//Get a particular Order details or summary
export const GetOrderDetails = asyncHandler(async (req: Request, res: Response) =>{
  const order = await OrderModel.findById(req.params.id)
  if(order){
      res.send(order)
  } else{
      res.status(404).send({message: "Order does not exist"})
  }
})

//Place an order
export const PlaceOrder = async (req: Request, res: Response) =>{
  try{
    const user = req.user
    if (req.body.orderItems.length === 0) {
        res.status(400).json({ message: "Cart is Empty"})
    } else{ 
        const createOrder = await OrderModel.create({
            user: user._id,
            orderItems: req.body.orderItems.map((x: Product) =>({ ...x, product: x._id})),
            deliveryAddress: req.body.deliveryAddress,
            itemPrice: req.body.itemPrice,
            deliveryPrice: req.body.deliveryPrice,
            totalPrice: req.body.totalPrice
        })
        res.status(201).json( {message: "Order Created", order: createOrder})
      }
  }
  catch(error){
    return res.status(500).json({ error: 'An error occurred' });
  }
}


//Order delivery status update
export const UpdateDeliverystatus = async (req: Request, res: Response) => {
  try{
    const order = await OrderModel.findById(req.params.id)
    if (order) {
      order.isDelivered = true
      order.deliveredAt = new Date(Date.now())
      const updatedOrder = await order.save()
      res.send({ message: 'Order Delivered', order: updatedOrder })
    } else {
      res.status(404).send({ message: 'Order Not Found' })
    }
  }
  catch(error){
    return res.status(500).json({ error: 'An error occurred' });
  }
}

//Delete order
export const DeleteOrder = asyncHandler(async (req: Request, res: Response) => {
  const order = await OrderModel.findById(req.params.id)
  if (order) {
    const deleteOrder = await order.deleteOne()
    res.send({ message: 'Order Deleted', order: deleteOrder })
  } else {
    res.status(404).send({ message: 'Order Not Found' })
  }
})