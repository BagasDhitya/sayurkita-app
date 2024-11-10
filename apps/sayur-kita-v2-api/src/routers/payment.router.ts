import { Router } from "express";
import { PaymentController } from "../controllers/payment.controller";
import { AuthenticateJwtMiddleware } from "../middlewares/auth.middleware";

const router = Router();
const paymentController = new PaymentController();
const authenticateJwt = new AuthenticateJwtMiddleware();

router.post(
  "/create-transaction",
  authenticateJwt.authenticateJwt.bind(authenticateJwt),
  authenticateJwt.authorizeRole("user").bind(authenticateJwt),
  paymentController.createTransaction.bind(paymentController)
);
router.get(
  "/transaction-status/:orderId",
  authenticateJwt.authenticateJwt.bind(authenticateJwt),
  authenticateJwt.authorizeRole("user").bind(authenticateJwt),
  paymentController.getTransactionStatus.bind(paymentController)
);

export default router;
