import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async purchaseProduct(req: Request, res: Response) {
    const { userId, productId, quantity } = req.body;
    const transaction = await this.userService.purchaseProduct(
      userId,
      productId,
      quantity
    );
    if (transaction) {
      res.status(201).send({
        message: "Successfully purchase product",
        status: res.statusCode,
      });
    } else {
      res.status(400).send({
        message: "Failed to purchase product",
        status: res.statusCode,
      });
    }
  }

  async getTransactionsHistory(req: Request, res: Response) {
    const { user_id } = req.params;
    const history = await this.userService.getTransactionsHistory(
      Number(user_id)
    );
    if (history) {
      res.status(200).send({
        message: "History successfully fetched",
        status: res.statusCode,
      });
    } else {
      res.status(404).send({
        message: "Failed to fetch history",
        status: res.statusCode,
      });
    }
  }

  async getProducts(req: Request, res: Response) {
    const { search, category, sortBy, sortOrder } = req.query;
    const products = await this.userService.getProducts(
      search as string,
      category as string,
      sortBy as "price" | "name",
      sortOrder as "asc" | "desc"
    );
    if (products) {
      res.status(200).send({
        data: products,
        message: "Products successfully retrieved",
        status: res.statusCode,
      });
    } else {
      res.status(404).send({
        message: "Failed to retrieve products",
        status: res.statusCode,
      });
    }
  }

  async getProductById(req: Request, res: Response) {
    const { product_id } = req.params;
    const product = await this.userService.getProductById(Number(product_id));
    if (product) {
      res.status(200).send({
        data: product,
        message: `Product with id ${product.product_id} was successfully retrieved`,
        status: res.statusCode,
      });
    } else {
      res.status(404).send({
        message: `Failed to retrieve product with id ${product_id}`,
        status: res.statusCode,
      });
    }
  }
}
