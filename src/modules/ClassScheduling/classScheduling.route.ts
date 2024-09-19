import express from "express";


import auth from "../../app/middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { ClassScheduleControllers } from "./classScheduling.controller";

const router = express.Router();

router.get(
  "/",
  auth(USER_ROLE.Admin),
  ClassScheduleControllers.getClassSchedule
);
router.get(
  "/singleClassSchedule/:id",
  auth(USER_ROLE.Admin, USER_ROLE.Trainer),
  ClassScheduleControllers.getSingleClassSchedule
);
router.post(
  "/create",
  auth(USER_ROLE.Admin),

  ClassScheduleControllers.createClassSchedule
);
router.put(
  "/update/:id",
  auth(USER_ROLE.Admin,USER_ROLE.Trainee),
  ClassScheduleControllers.updateClassSchedule
);
router.delete(
  "/delete",
  auth(USER_ROLE.Admin),
  ClassScheduleControllers.deleteClassSchedule
);

export const ClassScheduleRoutes = router;
