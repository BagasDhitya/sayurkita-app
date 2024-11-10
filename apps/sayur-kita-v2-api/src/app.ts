import express from "express";
import environment from "dotenv";
import cors from "cors";

import adminRouter from "./routers/admin.router";
import userRouter from "./routers/user.router";
import authRouter from "./routers/auth.router";
import messageRouter from "./routers/message.router";
import schedulerRouter from "./routers/scheduler.router";
import queueRouter from "./routers/queue.router";
import paymentRouter from "./routers/payment.router";

import { ErrorHandlerMiddleware } from "./middlewares/error.handler.middleware";

environment.config();

const app = express();
const errorHandler = new ErrorHandlerMiddleware();
const PORT = parseInt(process.env.SERVER_PORT_DEV as string) || 8800;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/api/admin", adminRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);
app.use("/api/options", schedulerRouter);
app.use("/api/queue", queueRouter);
app.use("/api/payments", paymentRouter);

app.use(errorHandler.errorHandler());

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Listening on port : ${PORT}`);
});
