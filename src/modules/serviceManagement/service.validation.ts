import { z } from "zod";

const createService = z.object({
  dataAndTime: z.string(),
  detail: z.string(),
  model: z.string(),
  phoneNumber: z.string(),
  serialNumber: z.string(),
  userEmail: z.string().email(),
  userName: z.string(),
});
export const ServiceValidation = { createService };
