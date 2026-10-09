import { ProductForm } from "@/components/products/product-form";
import { products } from "@/data/products";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ productId: string }>;
}

export default async function EditProductPage({ params }: Props) {
  const { productId } = await params;

  const product = products.find((p) => p.id === productId);

  if (!product) notFound();

  return <ProductForm initialData={product} mode="edit" />;
}
