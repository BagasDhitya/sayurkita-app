import { PrismaClient } from "@prisma/client";

export class UserService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getProducts(
    search: string = "",
    category: string = "",
    sortBy: "price" | "name" = "name",
    sortOrder: "asc" | "desc" = "asc"
  ) {
    return this.prisma.products.findMany({
      where: {
        name: {
          contains: search,
          mode: "insensitive",
        },
        category: {
          contains: category,
          mode: "insensitive",
        },
      },
      orderBy: {
        [sortBy]: sortOrder,
      },
    });
  }

  async getProductById(product_id: number) {
    return this.prisma.products.findUnique({
      where: {
        product_id: product_id,
      },
    });
  }

  async purchaseProduct(user_id: number, product_id: number, quantity: number) {
    // cek apakah produk ditemukan atau tidak
    const product = await this.prisma.products.findUnique({
      where: {
        product_id: product_id,
      },
    });

    // cek apakah stok produk masih ada atau tidak
    if (!product || product.stock < quantity) {
      throw new Error("Product not available or stuck insufficient");
    }

    // cek apakah ada diskon atau tidak
    let totalPrice = 0;
    if (product.discounted_price > 0) {
      totalPrice = product.discounted_price * quantity;
    } else {
      totalPrice = product.price * quantity;
    }

    // mengurangi stock produk
    await this.prisma.products.update({
      where: {
        product_id: product_id,
      },
      data: {
        stock: product.stock - quantity,
      },
    });

    // membuat transaksi
    const transaction = await this.prisma.transactions.create({
      data: {
        userId: user_id,
        productId: product_id,
        quantity: quantity,
        total_price: totalPrice,
      },
    });

    return transaction;
  }

  async getTransactionsHistory(user_id: number) {
    return this.prisma.transactions.findMany({
      where: { userId: user_id },
      include: {
        product: true,
      },
    });
  }
}
