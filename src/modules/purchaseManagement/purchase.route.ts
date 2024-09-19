import express from "express";

import validateRequest from "../../app/middlewares/validateRequest";

import auth from "../../app/middlewares/auth";
import { PurchaseValidation } from "./purchase.validation";
import { PurchaseControllers } from "./purchase.controller";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.get("/", auth(USER_ROLE.seller), PurchaseControllers.getPurchase);
router.get(
  "/:email",
  auth(USER_ROLE.buyer),
  PurchaseControllers.getSinglePurchase
);
router.post(
  "/create",
  auth(USER_ROLE.buyer),
  validateRequest(PurchaseValidation.createPurchase),
  PurchaseControllers.createPurchase
);

export const PurchaseRoutes = router;
