import { z as zod } from "zod";

export const productSchema = zod.object({
  name: zod.string().min(1, "Name is required"),
  price: zod
    .string()
    .transform((value) => parseFloat(value))
    .refine((value) => value > 0, {
      message: "Price must be greater than 0",
    }),
  description: zod.string().optional(),
  stock: zod
    .string()
    .transform((value) => parseInt(value))
    .refine((value) => value >= 0, {
      message: "Stock must be greater than or equal to 0",
    }),
  category: zod.enum(["Sayuran Hijau", "Umbi-umbian"]),
  email: zod.array(zod.string().email("Invalid email format")),
  image: zod
    .instanceof(File)
    .refine((file: File) => file.size <= 2 * 1024 * 1024, {
      message: "File size exceeds 2 MB limit",
    }),
});

export type ProductData = zod.infer<typeof productSchema>;
