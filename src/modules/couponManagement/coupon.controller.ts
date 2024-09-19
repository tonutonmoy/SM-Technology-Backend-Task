import catchAsync from "../../app/config/utlis/catchAsync";
import { CouponServices } from "./coupon.services";

const createCoupon = catchAsync(async (req, res) => {
  const result = await CouponServices.createCouponDB(req?.body);

  res.send({
    statusCode: 201,
    success: true,
    message: "Coupon created successfully",
    data: result,
  });
});

const getCoupon = catchAsync(async (req, res) => {
  const result = await CouponServices.getCouponDB();

  res.send({
    statusCode: 201,
    success: true,
    message: "Coupon get successfully",
    data: result,
  });
});
const getSingleCoupon = catchAsync(async (req, res) => {
  const code = req?.params?.code;
  const result = await CouponServices.getSingleCouponDB(code);

  res.send({
    statusCode: 201,
    success: true,
    message: "Coupon get successfully",
    data: result,
  });
});

const deleteCoupon = catchAsync(async (req, res) => {
  const _id = req?.params?.id;
  const result = await CouponServices.deleteCouponDB(_id);

  res.send({
    statusCode: 201,
    success: true,
    message: "Coupon delete successfully",
    data: result,
  });
});

export const CouponControllers = {
  createCoupon,
  getCoupon,
  deleteCoupon,
  getSingleCoupon,
};
