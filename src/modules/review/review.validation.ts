import { z } from "zod";

const reviewSales = z.object({
  name: z.string(),
  email: z.string(),
  rating: z.number(),
  review: z.string(),
  image: z.string(),
  productId: z.string(),
});
export const ReviewValidation = { reviewSales };
