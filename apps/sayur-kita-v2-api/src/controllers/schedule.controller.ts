import { Request, Response } from "express";
import { SchedulerService } from "../services/scheduler.service";

export class SchedulerController {
  private scheduler: SchedulerService;

  constructor() {
    this.scheduler = new SchedulerService();
  }

  async scheduleTask(req: Request, res: Response) {
    const { cronExpression } = req.body;
    const result: any = await this.scheduler.scheduleTask(
      cronExpression,
      () => {
        console.log(`Task executed at ${new Date()}`);
      }
    );

    if (result) {
      res.status(200).send({
        message: "Successfully executed cron expression",
        status: res.statusCode,
      });
    } else {
      res.status(400).send({
        message: "Failed to execute cron expression",
        status: res.statusCode,
      });
    }
  }
}
