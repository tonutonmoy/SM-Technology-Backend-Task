import express from "express";

import validateRequest from "../../app/middlewares/validateRequest";

import auth from "../../app/middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

import { ReviewValidation } from "./review.validation";
import { ReviewControllers } from "./review.controller";

const router = express.Router();

router.get("/:id", auth(USER_ROLE.seller,USER_ROLE.buyer), ReviewControllers.getReview);
router.post(
  "/",
  auth(USER_ROLE.seller,USER_ROLE.buyer),
  validateRequest(ReviewValidation.reviewSales),
  ReviewControllers.createReview
);

export const ReviewRoutes = router;
