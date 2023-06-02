import mongoose from "mongoose";
//import { nanoid } from "nanoid";

export interface ProductDocument extends mongoose.Document {
  name: string;
  price: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new mongoose.Schema(
  {
    // ProductId: {
    //   type: String,
    //   required: true,
    //   unique: true,
    //   default: () => nanoid(10),
    // },
    name:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    description: { type: String, default: true },
  },
  { timestamps: true }
);

const Product = mongoose.model<ProductDocument>("Product", ProductSchema);

export default Product;