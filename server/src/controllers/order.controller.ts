import { Request, Response } from "express";
import { get } from "lodash";
import {createOrder, findOrder, UpdateOrder, deleteOrder} from "../services/order.services";

export async function createOrderHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const body = req.body;

  const order = await createOrder({ ...body, user: userId });

  return res.send(order);
}

export async function updateOrderHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const orderId = get(req, "params.orderId");
  const update = req.body;

  const order = await findOrder({ orderId });

  if (!order) {
    return res.sendStatus(404);
  }

  if (String(order.user) !== userId) {
    return res.sendStatus(401);
  }

  const updatedOrder = await UpdateOrder({ orderId }, update, { new: true });

  return res.send(updatedOrder);
}
export async function getOrderHandler(req: Request, res: Response) {
  const orderId = get(req, "params.orderId");
  const order = await findOrder({ orderId });

  if (!order) {
    return res.sendStatus(404);
  }

  return res.send(order);
}

export async function deleteorderHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const orderId = get(req, "params.orderId");

  const order = await findOrder({ orderId });

  if (!order) {
    return res.sendStatus(404);
  }

  if (String(order.user) !== String(userId)) {
    return res.sendStatus(401);
  }

  await deleteOrder({ orderId });

  return res.sendStatus(200);
}