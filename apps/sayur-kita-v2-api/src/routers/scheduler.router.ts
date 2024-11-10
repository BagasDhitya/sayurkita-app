import { Router } from "express";
import { SchedulerController } from "../controllers/schedule.controller";

const router = Router();
const schedulerController = new SchedulerController();

router.post(
  "/scheduler",
  schedulerController.scheduleTask.bind(schedulerController)
);

export default router;
