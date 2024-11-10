import { Request, Response } from "express";
import { QueueService } from "../services/queue.service";

export class QueueController {
  private queueService: QueueService;

  constructor() {
    this.queueService = new QueueService();
  }

  async addToQueue(req: Request, res: Response) {
    const { data } = req.body;
    await this.queueService.addToQueue(data);
    res.status(200).send({
      message: `Task added to queue : ${JSON.stringify(data)}`,
      status: res.statusCode,
    });
  }
}
