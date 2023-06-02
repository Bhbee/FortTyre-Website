import mongoose from "mongoose";
import { nanoid } from "nanoid";
import { UserDocument } from "./user.model";
import { ProductDocument } from "./product.model";

export interface OrderDocument extends mongoose.Document {
  user: UserDocument["_id"];
  product: ProductDocument["_id"];
}

const OrderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
      default: () => nanoid(10),
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  },
  { timestamps: true }
);

const Order = mongoose.model<OrderDocument>("Order", OrderSchema);

export default Order;