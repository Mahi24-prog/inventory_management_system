import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  sku: z
    .string()
    .min(1, "SKU is required")
    .regex(/^[A-Z]+-[A-Z]+-\d{3}$/, "SKU format must be e.g. ELEC-MBP-001"),
  category: z.enum(
    [
      "Electronics",
      "Clothing",
      "Food & Beverage",
      "Office Supplies",
      "Tools & Hardware",
      "Health & Beauty",
    ],
    { error: () => ({ message: "Please select a category" }) },
  ),
  price: z.number().int().positive("Price must be greater than 0"),
  stock: z.number().min(0, "Stock cannot be negative"),
  minStock: z.number().min(1, "Minimum stock must be at least 1"),
  supplier: z.string().min(1, "Supplier is required"),
  description: z.string().optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>;

export const stockTransactionSchema = z.object({
  productId: z.string().min(1, "Please select a product"),
  type: z.enum(["in", "out"]),
  quantity: z
    .number({ error: "Quantity must be a number" })
    .int("Quantity must be a whole number")
    .positive("Quantity must be at least 1"),
  reason: z.string().min(1, "Reason is required"),
});

export type stockTransactionValue = z.infer<typeof stockTransactionSchema>;
