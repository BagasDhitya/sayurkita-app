import { QueueController } from "../controllers/queue.controller";
import { Router } from "express";

const router = Router();
const queueController = new QueueController();

router.post("/add-queue", queueController.addToQueue.bind(queueController));

export default router;
