import { Schema, model } from "mongoose";
import { TPurchase } from "./purchase.interface";

const purchaseSchema = new Schema<TPurchase>({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  buyerName: { type: String, required: true },
  buyerEmail: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  date: { type: String, required: true },
  category: { type: String, required: true },
  brand: { type: String, required: true },
  compatibility: { type: String, required: true },
  interface: { type: String, required: true },
  capacity: { type: String, required: true },
  color: { type: String, required: true },
});

const PurchaseModel = model<TPurchase>("Purchase", purchaseSchema);

export default PurchaseModel;
