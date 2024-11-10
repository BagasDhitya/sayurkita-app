import cron from "node-cron";

export class SchedulerService {
  async scheduleTask(cronExpression: string, task: () => void) {
    try {
      cron.schedule(cronExpression, task);
      return true;
    } catch (error) {
      return error;
    }
  }
}
