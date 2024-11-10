export interface Product {
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  description: string;
}

export interface PaymentVA {
  orderId: string;
  gross_amount: number;
  payment_type: string;
  bank_transfer?: {
    bank?: string;
    permata?: {
      recipient_name?: string;
    };
  };
}

export interface PaymentEWallet {
  orderId: string;
  gross_amount: number;
  payment_type: string;
  qris?: {
    acquirer?: string;
  };
  item_details?: Product[];
  customer_details?: {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
  };
  gopay?: {
    enable_callback: boolean;
    callback_url: string;
  };
}

export interface Transaction {}

export interface Discount {
  productId: number;
  discount_percentage: number;
  start_date: Date;
  end_date: Date;
}

export interface Auth {
  email: string;
  name: string;
  password: string;
  role: string;
}

export interface Email {
  from: string | undefined;
  to: string;
  subject: string;
  template: string;
  context: any;
}
