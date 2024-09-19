import { Schema, model } from "mongoose";
import { TSales } from "./salesManagement.interface";

const salesSchema = new Schema<TSales>({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  date: { type: String, required: true },
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Inventory",
    required: true,
  },
});

const SalesModel = model<TSales>("Sales", salesSchema);

export default SalesModel;
