import { Router } from "express";


import { UserRoutes } from "../modules/user/user.route";

import { ClassScheduleRoutes } from "../modules/ClassScheduling/classScheduling.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/classSchedule",
    route: ClassScheduleRoutes,
  },
  {
    path: "/auth",
    route: UserRoutes,
  },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
