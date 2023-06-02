import { Request, Response } from "express";
import { get } from "lodash";
import {addProduct, findProduct, UpdateProduct, deleteProduct} from "../services/product.services";

export async function addProductHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const body = req.body;

  const product = await addProduct({ ...body, user: userId });

  return res.send(product);
}

export async function updateproductHandler(req: Request, res: Response) {
  const productId = get(req, "params.productId");
  const update = req.body;

  const product = await findProduct({ productId });

  if (!product) {
    return res.sendStatus(404);
  }

  const updatedproduct = await UpdateProduct({ productId }, update, { new: true });

  return res.send(updatedproduct);
}
export async function getProductHandler(req: Request, res: Response) {
  const productId = get(req, "params.productId");
  const product = await findProduct({ productId });

  if (!product) {
    return res.sendStatus(404);
  }

  return res.send(product);
}

export async function deleteproductHandler(req: Request, res: Response) {
  const productId = get(req, "params.productId");

  const product = await findProduct({ productId });

  if (!product) {
    return res.sendStatus(404);
  }
  await deleteProduct({ productId });

  return res.sendStatus(200);
}