import express from "express";


import auth from "../../app/middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { ClassScheduleControllers } from "./classScheduling.controller";

const router = express.Router();

router.get(
  "/",
  
  ClassScheduleControllers.getClassSchedule
);
router.get(
  "/getTranierClassSchedule/:id",
  auth(USER_ROLE.Admin, USER_ROLE.Trainer),
  ClassScheduleControllers.getTranierClassSchedule
);
router.post(
  "/create",
  auth(USER_ROLE.Admin),

  ClassScheduleControllers.createClassSchedule
);
router.put(
  "/bookingClass/:id",
  auth(USER_ROLE.Trainee),
  ClassScheduleControllers.updateClassSchedule
);
router.put(
  "/bookingClassCancel/:id",
  auth(USER_ROLE.Trainee),
  ClassScheduleControllers.CancelClassSchedule
);
router.delete(
  "/delete",
  auth(USER_ROLE.Admin),
  ClassScheduleControllers.deleteClassSchedule
);

export const ClassScheduleRoutes = router;
