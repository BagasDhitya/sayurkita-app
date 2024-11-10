import { z as validate } from "zod";

export const productSchema = validate.object({
  name: validate.string().min(1, "Name is required"),
  price: validate.number().positive("Price must be positive"),
  stock: validate.number().positive("Stock must be positive"),
  description: validate.string().optional(),
  category: validate.string().min(1, "Category is required"),
  image: validate.string().min(1, "URL is required"),
});
