import { z } from "zod";

const userRegisterValidation = z.object({
  name: z.string(),
  password: z.string(),
  email: z.string(),

});

const userLoginValidation = z.object({
  email: z.string(),
  password: z.string(),
});

export const UserValidation = {
  userRegisterValidation,
  userLoginValidation,
};
