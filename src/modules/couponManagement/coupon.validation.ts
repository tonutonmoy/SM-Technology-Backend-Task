import { z } from "zod";

const createCoupon = z.object({
  name: z.string(),
  amountOrPercentage: z.number().optional(),
  code: z.string(),
});
export const CouponValidation = { createCoupon };
