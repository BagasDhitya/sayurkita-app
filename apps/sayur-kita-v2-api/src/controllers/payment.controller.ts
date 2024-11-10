import { Request, Response } from "express";
import { PaymentService } from "../services/payment.service";
import { PaymentVA } from "../models/models";

export class PaymentController {
  private paymentService: PaymentService;

  constructor() {
    this.paymentService = new PaymentService();
  }

  async createTransaction(req: Request, res: Response) {
    const { orderId, payment_type, gross_amount, bank } = req.body;
    const payment: PaymentVA = {
      orderId: orderId,
      payment_type: payment_type,
      gross_amount: gross_amount,
      bank_transfer: {
        bank: bank,
      },
    };
    const transaction = await this.paymentService.createTransaction(payment);
    if (transaction) {
      await this.paymentService.createPaymentHistory(transaction);
      res.status(201).send({
        data: transaction,
        status: res.statusCode,
      });
    } else {
      res.status(400).send({
        message: `Failed to create transaction : ${res.statusMessage}`,
        status: res.statusCode,
      });
    }
  }

  async getTransactionStatus(req: Request, res: Response) {
    const { orderId } = req.params;
    const status = await this.paymentService.getTransactionStatus(orderId);
    if (status) {
      res.status(200).send({
        data: status,
        status: res.statusCode,
      });
    } else {
      res.status(404).send({
        message: "Transaction not found",
        status: res.statusCode,
      });
    }
  }
}
