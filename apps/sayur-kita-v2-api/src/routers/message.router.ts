import { Router } from "express";
import { MessageController } from "../controllers/message.controller";

const router = Router();
const messageController = new MessageController();

router.post(
  "/publish",
  messageController.publishMessage.bind(messageController)
);
router.get(
  "/subscribe/:channel",
  messageController.subscribeChannel.bind(messageController)
);

export default router;
