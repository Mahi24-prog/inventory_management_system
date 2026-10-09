"use client";

import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, ProductFormValues } from "@/lib/validator/product";

import { Category, Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeftIcon, SaveIcon } from "lucide-react";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const categories = [
  "Electronics",
  "Clothing",
  "Food & Beverage",
  "Office Supplies",
  "Tools & Hardware",
  "Health & Beauty",
] as const;

interface Props {
  initialData?: Product;
  mode: "add" | "edit";
}

export const ProductForm = ({ initialData, mode }: Props) => {
  const router = useRouter();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: initialData?.name ?? "",
      sku: initialData?.sku ?? "",
      category: initialData?.category ? initialData.category : undefined,
      price: initialData?.price ?? undefined,
      stock: initialData?.stock ?? undefined,
      minStock: initialData?.minStock ?? undefined,
      supplier: initialData?.supplier ?? "",
      description: initialData?.description ?? "",
    },
  });

  async function onSubmit(data: ProductFormValues) {
    try {
      //Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form submitted with data:", data);
      toast.success(
        mode === "add"
          ? "Product added successfully!"
          : "Product updated successfully!",
        { description: `${data.name} has been saved to your inventory.` },
      );
      router.push("/products");
    } catch {
      toast.error("Something went wrong", {
        description: "Failed to save product, Please try again.",
      });
    }
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <Button variant="ghost" onClick={() => router.back()}>
        <ArrowLeftIcon className="size-4" />
        Back to Products
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            {mode === "add" ? "New Product Details" : "Edit Product Details"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            id="create-new-product"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="name">Product Name</FieldLabel>
                    <Input
                      id="name"
                      {...field}
                      aria-invalid={fieldState.invalid}
                      placeholder="e.g. Apple MacBook Pro"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="sku"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="sku">SKU*</FieldLabel>
                    <Input
                      id="sku"
                      {...field}
                      aria-invalid={fieldState.invalid}
                      placeholder="e.g. ELEC-MBP-001"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="category"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="category">Category</FieldLabel>
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        id="category"
                        aria-invalid={fieldState.invalid}
                        className="min-w-30"
                      >
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="item-aligned">
                        {categories.map((category) => (
                          <SelectItem value={category} key={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="supplier"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="supplier">Supplier</FieldLabel>
                    <Input
                      id="supplier"
                      {...field}
                      aria-invalid={fieldState.invalid}
                      placeholder="e.g. Apple Inc."
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <Separator />
            <p className="text-sm font-medium text-slate-500 mb-4">
              Pricing & Stock
            </p>
            <FieldGroup className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Controller
                name="price"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="price">Price ($)</FieldLabel>
                    <Input
                      type="number"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      aria-invalid={fieldState.invalid}
                      placeholder="0.00"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="stock"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="stock">Current Stock</FieldLabel>
                    <Input
                      type="number"
                      id="stock"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      aria-invalid={fieldState.invalid}
                      placeholder="0"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="minStock"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="minStock">Minimum Stock</FieldLabel>
                    <Input
                      id="minStock"
                      type="number"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      aria-invalid={fieldState.invalid}
                      placeholder="0"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <Separator />
            <p className="text-sm font-medium text-slate-500 mb-4">
              Additional Info
            </p>
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="description">Description</FieldLabel>
                  <Textarea
                    id="description"
                    placeholder="Brief product description..."
                    rows={3}
                    className="resize-none"
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal" className="flex justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting || !form.formState.isDirty}
              form="create-new-product"
            >
              <SaveIcon className="size-4" />
              {form.formState.isSubmitting
                ? "Saving..."
                : mode === "add"
                  ? "Add Product"
                  : "Save Changes"}
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
};
