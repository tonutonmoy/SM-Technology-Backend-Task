import { z } from "zod";

const createInventory = z.object({
  name: z.string(),
  quantity: z.number(),
  price: z.number(),
  category: z.string(),
  brand: z.string(),
  compatibility: z.string(),
  interface: z.string(),
  condition: z.string(),
  capacity: z.string(),
  color: z.string(),
  image: z.string(),
});
export const InventoryValidation = { createInventory };
