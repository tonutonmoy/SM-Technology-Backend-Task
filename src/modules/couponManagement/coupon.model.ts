import { Schema, model } from "mongoose";
import { TCoupon } from "./coupon.interface";

const couponSchema = new Schema<TCoupon>({
  name: { type: String, required: true },
  amountOrPercentage: { type: Number },
  code: { type: String, required: true, unique: true },
});

const CouponModel = model<TCoupon>("Coupon", couponSchema);

export default CouponModel;
