import { Request, Response } from "express";
import { MessageService } from "../services/message.service";

export class MessageController {
  private messageService: MessageService;

  constructor() {
    this.messageService = new MessageService();
  }

  async publishMessage(req: Request, res: Response): Promise<void> {
    const { channel, message } = req.body;
    const result: any = await this.messageService.sendMessage(channel, message);
    if (result) {
      res.status(200).send({
        message: `Message sent to channel ${channel}`,
        status: res.statusCode,
      });
    } else {
      res.status(400).send({
        message: `Failed to send message`,
        status: res.statusCode,
      });
    }
  }

  async subscribeChannel(req: Request, res: Response): Promise<void> {
    const { channel } = req.params;

    res.set({
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });

    this.messageService.receiveMessage(channel, (message: string) => {
      res.write(`data : ${message} `);
    });

    // req.on("close", () => {
    //   console.log(`Client closed connection for channel ${channel}`);
    //   res.end();
    // });
  }
}
