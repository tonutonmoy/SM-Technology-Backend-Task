import { Types } from "mongoose";

export interface TSales {
  name: string;
  quantity: number;
  price: number;
  date: string;
  productId: Types.ObjectId;
}
