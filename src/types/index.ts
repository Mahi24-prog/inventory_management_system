export type Category =
  | "Electronics"
  | "Clothing"
  | "Food & Beverage"
  | "Office Supplies"
  | "Tools & Hardware"
  | "Health & Beauty";

export type StockStatus = "In Stock" | "Low Stock" | "Out of Stock";

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: Category;
  price: number;
  stock: number;
  minStock: number;
  supplier: string;
  lastUpdated: string;
  description?: string;
}
export interface StockTransaction {
  id: string;
  productId: string;
  productName: string;
  type: "in" | "out";
  quantity: number;
  reason: string;
  date: string;
  performedBy: string;
}
