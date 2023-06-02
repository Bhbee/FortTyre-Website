import {FilterQuery, UpdateQuery, QueryOptions} from "mongoose";
import Product, { ProductDocument } from "../models/product.model";
  
  export function addProduct(input: ProductDocument) {
    return Product.create(input);
  }
  
  export function findProduct(
    query: FilterQuery<ProductDocument>,
    options: QueryOptions = { lean: true }
  ) {
    return Product.findOne(query, {}, options);
  }
  
  export function UpdateProduct(
    query: FilterQuery<ProductDocument>,
    update: UpdateQuery<ProductDocument>,
    options: QueryOptions
  ) {
    return Product.findOneAndUpdate(query, update, options);
  }
  
  export function deleteProduct(query: FilterQuery<ProductDocument>) {
    return Product.deleteOne(query);
  }