import ApiErrorType from "../Types/ApiErrortype";
import { OrderItems } from "../Types/CartItem";
import {Product} from "../Types/Product"

export const getError = (error: ApiErrorType) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message
}


export const convertProductToCartItem = (product: Product): OrderItems  => {
  const orderItem: OrderItems = {
    price: product.price,
    name: product.brand,
    quantity: 1
  } 
  return orderItem;
}