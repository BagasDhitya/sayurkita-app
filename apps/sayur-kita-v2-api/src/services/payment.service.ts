import axios from "axios";
import environment from "dotenv";
import { PaymentVA } from "../models/models";
import { PrismaClient } from "@prisma/client";

environment.config();

export class PaymentService {
  private serverKey: string;
  private apiUrl: string;
  private prisma: PrismaClient;

  constructor() {
    this.serverKey = process.env.MIDTRANS_SERVER_KEY || "";
    this.apiUrl = process.env.MIDTRANS_BASE_URL || "";
    this.prisma = new PrismaClient();

    if (!this.serverKey) {
      throw new Error(
        "MIDTRANS_SERVER_KEY is not defined in the environment variables."
      );
    }
    if (!this.apiUrl) {
      throw new Error(
        "MIDTRANS_BASE_URL is not defined in the environment variables."
      );
    }
  }

  private getAuthHeader() {
    return {
      Authorization: `Basic ${Buffer.from(this.serverKey + ":").toString(
        "base64"
      )}`,
    };
  }

  async createTransaction(payment: PaymentVA) {
    try {
      console.log("bank transfer : ", payment.bank_transfer?.bank);
      const response = await axios.post(
        `${this.apiUrl}/charge`,
        {
          payment_type: payment.payment_type,
          bank_transfer: {
            bank: payment.bank_transfer?.bank,
          },
          transaction_details: {
            order_id: payment.orderId,
            gross_amount: payment.gross_amount,
          },
        },
        {
          headers: this.getAuthHeader(),
        }
      );
      return response.data;
    } catch (error) {
      console.error("Transaction creation failed : ", error);
      throw error;
    }
  }

  async getTransactionStatus(orderId: string) {
    try {
      const response = await axios.get(`${this.apiUrl}/${orderId}/status`, {
        headers: this.getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      console.error("Failed to retrieve transaction status : ", error);
      throw error;
    }
  }

  async createPaymentHistory(transaction: any) {
    try {
      const response = await this.prisma.payments.create({
        data: {
          payment_id_MT: transaction.transaction_id,
          transactionId: Number(transaction.order_id),
          payment_type: transaction.payment_type,
          payment_status: transaction.transaction_status,
          payment_amount: Number(transaction.gross_amount),
          payment_date: new Date(transaction.transaction_time),
        },
      });
      return response;
    } catch (error) {
      console.log("Failed to create payment history : ", error);
    }
  }
}
