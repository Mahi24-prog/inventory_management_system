"use client";

import { useState, useMemo, use } from "react";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProductFilters } from "@/components/products/product-filters";
import { ProductTable } from "@/components/products/product-table";

import { PlusIcon } from "lucide-react";

/* Dummy Data Import */
import { products } from "@/data/products";
/* Dummy Data Import */

export default function ProductPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.sku.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "all" || product.category === category;

      const stockStatus =
        product.stock === 0
          ? "Out of stock"
          : product.stock <= product.minStock
            ? "Low Stock"
            : "In Stock";

      const matchesStatus = status === "all" || stockStatus === status;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [search, category, status]);

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Page Action  */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Showing{" "}
          <span className="font-semibold text-slate-700">
            {filtered.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-700">
            {products.length}
          </span>{" "}
          products.
        </p>
        <Button asChild>
          <Link href="/products/new">
            <PlusIcon className="size-4 mr-2" />
            Add Product
          </Link>
        </Button>
      </div>
      {/* Page Action  */}

      {/* Filters */}
      <ProductFilters
        search={search}
        category={category}
        status={status}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
        onStatusChange={setStatus}
      />
      {/* Filters */}

      {/* Product Table */}
      <Card>
        <CardContent className="p-0">
          <ProductTable products={filtered} />
        </CardContent>
      </Card>
      {/* Product Table */}
    </div>
  );
}
