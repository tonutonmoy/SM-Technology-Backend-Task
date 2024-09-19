import express from "express";

import validateRequest from "../../app/middlewares/validateRequest";
import { SalesControllers } from "./salesManagement.controller";
import { SalesValidation } from "./salesManagement.validation";
import auth from "../../app/middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.get("/", auth(USER_ROLE.seller), SalesControllers.getSales);
router.post(
  "/create",
  auth(USER_ROLE.seller),
  validateRequest(SalesValidation.createSales),
  SalesControllers.createSales
);

export const SalesRoutes = router;
