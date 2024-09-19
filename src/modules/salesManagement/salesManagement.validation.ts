import { z } from "zod";

const createSales = z.object({
  name: z.string(),
  quantity: z.number(),
  date: z.string(),
  productId: z.string(),
});
export const SalesValidation = { createSales };
