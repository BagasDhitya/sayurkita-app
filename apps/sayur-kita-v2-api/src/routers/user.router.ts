import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { AuthenticateJwtMiddleware } from "../middlewares/auth.middleware";

const router = Router();
const userController = new UserController();
const authenticateJwt = new AuthenticateJwtMiddleware();

router.post(
  "/purchase",
  authenticateJwt.authenticateJwt.bind(authenticateJwt),
  authenticateJwt.authorizeRole("user").bind(authenticateJwt),
  userController.purchaseProduct.bind(userController)
);
router.get(
  "/history/:user_id",
  authenticateJwt.authenticateJwt.bind(authenticateJwt),
  authenticateJwt.authorizeRole("user").bind(authenticateJwt),
  userController.getTransactionsHistory.bind(userController)
);
router.get("/products", userController.getProducts.bind(userController));
router.get(
  "/products/detail/:product_id",
  userController.getProductById.bind(userController)
);

export default router;
