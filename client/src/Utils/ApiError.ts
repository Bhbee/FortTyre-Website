import ApiErrorType from "../Types/ApiErrortype";
import { OrderItems } from "../Types/CartItem";
import {Product} from "../Types/Product"

export const getError = (error: ApiErrorType) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.response.data.message
}


export const convertProductToCartItem = (product: Product): OrderItems  => {
  const orderItem: OrderItems = {
    _id: product._id,
    image: product.image,
    price: product.price,
    name: product.brand,
    quantity: 1,
    countInStock: product.countInStock
  } 
  return orderItem;
}