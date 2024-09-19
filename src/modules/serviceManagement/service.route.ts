import express from "express";

import validateRequest from "../../app/middlewares/validateRequest";

import auth from "../../app/middlewares/auth";
import { ServiceControllers } from "./service.controller";
import { ServiceValidation } from "./service.validation";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.get("/", auth(USER_ROLE.seller), ServiceControllers.getService);
router.post(
  "/create",
  auth(USER_ROLE.buyer),
  validateRequest(ServiceValidation.createService),
  ServiceControllers.createService
);

export const ServiceRoutes = router;
