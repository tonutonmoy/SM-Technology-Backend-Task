import { TCoupon } from "./coupon.interface";
import CouponModel from "./coupon.model";

const createCouponDB = async (payload: TCoupon) => {
  const result = await CouponModel.create(payload);

  console.log(result);
  return result;
};

const getCouponDB = async () => {
  const result = await CouponModel.find();
  console.log("aise");
  return result;
};
const getSingleCouponDB = async (code: string) => {
  const result = await CouponModel.findOne({ code });
  console.log(result, "koi");
  return result;
};

const deleteCouponDB = async (_id: string) => {
  const result = await CouponModel.deleteOne({ _id });
  return result;
};

export const CouponServices = {
  createCouponDB,
  getCouponDB,

  deleteCouponDB,
  getSingleCouponDB,
};
