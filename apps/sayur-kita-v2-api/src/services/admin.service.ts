import { PrismaClient } from "@prisma/client";
import { Product } from "../models/models";
import { productSchema } from "../validators/product.validator";

import cloudinary from "../config/cloudinary";

export class AdminService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getProducts() {
    return this.prisma.products.findMany();
  }

  async getProductById(product_id: number) {
    return this.prisma.products.findUnique({
      where: { product_id },
    });
  }

  async createProduct(data: Product) {
    const validatedData = productSchema.parse(data);

    // upload gambar ke cloudinary
    const uploadResponse = await cloudinary.uploader.upload(
      validatedData.image,
      {
        folder: "vegetables",
      }
    );
    
    // membuat product di tabel products
    return this.prisma.products.create({
      data: {
        name: validatedData.name,
        price: Number(validatedData.price),
        stock: Number(validatedData.stock),
        description: validatedData.description || "",
        category: validatedData.category,
        image: uploadResponse.secure_url,
      },
    });
  }

  async updateProduct(product_id: number, data: Product) {
    return this.prisma.products.update({
      where: { product_id },
      data,
    });
  }

  async deleteProduct(product_id: number) {
    return this.prisma.products.delete({
      where: { product_id },
    });
  }

  async getTransactionHistory() {
    return this.prisma.transactions.findMany({
      include: {
        user: true,
        product: true,
      },
    });
  }

  async applyDiscount(product_id: number, discountPercentage: number) {
    // ambil produk berdasarkan id
    const product = await this.prisma.products.findUnique({
      where: {
        product_id: product_id,
      },
    });

    // menghitung harga setelah diskon
    const originalPrice = product?.price as number;
    const discountedPrice = originalPrice * (1 - discountPercentage / 100);

    // update harga setelah diskon
    await this.prisma.products.update({
      where: {
        product_id: product_id,
      },
      data: {
        discounted_price: discountedPrice,
      },
    });

    // menyimpan informasi diskon
    return this.prisma.discounts.create({
      data: {
        productId: product_id,
        discount_percentage: discountPercentage,
        start_date: new Date(),
        end_date: new Date(new Date().setDate(new Date().getDate() + 7)), // diskon selama 7 hari
      },
    });
  }
}
