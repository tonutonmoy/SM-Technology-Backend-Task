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
  auth(USER_ROLE.Trainee),
  
  USerControllers.updateUser
);
router.put(
  
  "/UpdateTrainerProfile/:id",
  auth(USER_ROLE.Admin),
  
  USerControllers.updateTrainer
);

router.delete(
  
  "/DeleteTrainerProfile",
  auth(USER_ROLE.Admin),
  
  USerControllers.deleteTrainer
);

export const UserRoutes = router;
