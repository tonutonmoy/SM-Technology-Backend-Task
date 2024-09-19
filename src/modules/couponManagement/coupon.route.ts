import express from "express";

import validateRequest from "../../app/middlewares/validateRequest";

import auth from "../../app/middlewares/auth";
import { CouponControllers } from "./coupon.controller";
import { CouponValidation } from "./coupon.validation";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.get(
  "/",
  auth(USER_ROLE.seller, USER_ROLE.buyer),
  CouponControllers.getCoupon
);
router.get(
  "/single/:code",
  auth(USER_ROLE.buyer),
  CouponControllers.getSingleCoupon
);

router.post(
  "/create",
  auth(USER_ROLE.seller),
  validateRequest(CouponValidation.createCoupon),
  CouponControllers.createCoupon
);

router.delete(
  "/delete/:id",
  auth(USER_ROLE.seller),
  CouponControllers.deleteCoupon
);

export const CouponRoutes = router;
