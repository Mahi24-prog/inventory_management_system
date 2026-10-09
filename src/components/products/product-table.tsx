import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { PencilIcon, ArrowUpDownIcon } from "lucide-react";

interface Props {
  products: Product[];
}

function getStockStatus(product: Product) {
  if (product.stock === 0) {
    return { label: "Out of Stock", variant: "destructive" as const };
  }
  if (product.stock <= product.minStock) {
    return { label: "Low Stock", variant: "warning" as const };
  }
  return { label: "In Stock", variant: "success" as const };
}

export const ProductTable = ({ products }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <div className="flex items-center gap-1">
              Product <ArrowUpDownIcon className="size-3" />
            </div>
          </TableHead>
          <TableHead>SKU</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Supplier</TableHead>
          <TableHead>Last Updated</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => {
          const status = getStockStatus(product);
          return (
            <TableRow key={product.id}>
              <TableCell className="font-medium text-slate-800">
                {product.name}
              </TableCell>
              <TableCell className="text-slate-500 font-mono text-xs">
                {product.sku}
              </TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.price.toFixed(2)}</TableCell>
              <TableCell>
                <span
                  className={
                    product.stock <= product.minStock
                      ? "text-red-600 font-semibold"
                      : ""
                  }
                >
                  {product.stock}
                </span>
                <span className="text-slate-400 text-xs">
                  {" "}
                  / min {product.minStock}
                </span>
              </TableCell>
              <TableCell>
                <Badge variant={status.variant}>{status.label}</Badge>
              </TableCell>
              <TableCell className="text-slate-500">
                {product.supplier}
              </TableCell>
              <TableCell className="text-slate-400 text-sm">
                {product.lastUpdated}
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`/products/${product.id}`}>
                    <PencilIcon className="size-4" />
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
