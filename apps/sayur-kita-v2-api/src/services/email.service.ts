import environment from "dotenv";
import { Product } from "../models/models";
import { Email } from "../models/models";
import sendEmail from "../config/nodemailer";

environment.config();

export class EmailService {
  sendEmail(email: string[], product: Product) {
    const mailOptions: Email = {
      from: process.env.EMAIL_USER,
      to: email.join(", "),
      subject: "New Product Arrived!",
      template: "product",
      context: {
        name: product.name,
        price: product.price,
        description: product.description,
        image: product.image,
        category: product.category,
      },
    };

    return sendEmail(mailOptions);
  }
}
