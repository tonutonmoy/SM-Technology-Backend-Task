import express from "express";
import { USerControllers } from "./user.controller";
import validateRequest from "../../app/middlewares/validateRequest";
import { UserValidation } from "./user.validation";
import auth from "../../app/middlewares/auth";
import { USER_ROLE } from "./user.constant";

const router = express.Router();
router.get(
  "/",
  auth(USER_ROLE.Admin),
  USerControllers.getUser
);
router.post(
  "/registration",
  validateRequest(UserValidation.userRegisterValidation),
  USerControllers.registerUser
);
router.post(
  "/createTrainer",
  auth(USER_ROLE.Admin),
  validateRequest(UserValidation.userRegisterValidation),
  USerControllers.createTrainer
);
router.post(
  "/login",
  validateRequest(UserValidation.userLoginValidation),
  USerControllers.loginUser
);

router.put(
  "/UpdateProfile",
  
  USerControllers.updateUser
);

export const UserRoutes = router;
