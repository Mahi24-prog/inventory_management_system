"use client";

import { cn } from "@/lib/utils";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  stockTransactionSchema,
  stockTransactionValue,
} from "@/lib/validator/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpCircleIcon, ArrowDownCircleIcon } from "lucide-react";
import { toast } from "sonner";

/*Dummy Data*/
import { products } from "@/data/products";
import { Separator } from "../ui/separator";
/*Dummy Data*/

interface Props {
  onSuccess: (entry: {
    productId: string;
    productName: string;
    type: "in" | "out";
    quantity: number;
    reason: string;
  }) => void;
}

export const StockForm = ({ onSuccess }: Props) => {
  const form = useForm<stockTransactionValue>({
    resolver: zodResolver(stockTransactionSchema),
    defaultValues: {
      productId: "",
      type: "in",
      quantity: undefined,
      reason: "",
    },
  });

  const selectedType = form.getValues("type");

  async function onSubmit(data: stockTransactionValue) {
    await new Promise((res) => setTimeout(res, 600));
    const product = products.find((p) => p.id === data.productId);
    onSuccess({ ...data, productName: product?.name ?? "" });
    toast.success(
      data.type === "in"
        ? "Stock added successfully"
        : "Stock removed successfully",
    );
    form.reset();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Record Stock Movement</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          id="stock-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {/* Toggle Stock type */}
          <Controller
            name="type"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="movementType">Movement Type</FieldLabel>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => field.onChange("in")}
                    className={cn(
                      "flex items-center justify-center gap-2 rounded-lg border-2 py-3 text-sm font-medium transition-colors cursor-pointer",
                      field.value === "in"
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                        : "border-slate-200 text-slate-500 hover:border-slate-300",
                    )}
                  >
                    <ArrowUpCircleIcon className="size-4" />
                    Stock In
                  </button>
                  <button
                    type="button"
                    onClick={() => field.onChange("out")}
                    className={cn(
                      "flex items-center justify-center gap-2 rounded-lg border-2 py-3 text-sm font-medium transition-colors cursor-pointer",
                      field.value === "out"
                        ? "border-red-400 bg-red-50 text-red-600"
                        : "border-slate-200 text-slate-500 hover:borer-slate-300",
                    )}
                  >
                    <ArrowDownCircleIcon className="size-4" />
                    Stock Out
                  </button>
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/* Toggle Stock type */}

          {/* Product Selection */}
          <Controller
            name="productId"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="product">Product</FieldLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger id="product">
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        <span>{p.name}</span>
                        <span className="ml-2 text-slate-400 text-xs">
                          ({p.stock} in stock)
                        </span>
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
          {/* Product Selection */}

          {/* Product Quantity */}
          <Controller
            name="quantity"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="quantity">Quantity</FieldLabel>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="0"
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/* Product Quantity */}

          {/* Reason */}
          <Controller
            name="reason"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="reason">Reason</FieldLabel>
                <Input
                  id="reason"
                  placeholder={
                    selectedType === "in"
                      ? "e.g. New shipment received"
                      : "e.g. Order #ORD-2401"
                  }
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/* Reason */}
        </form>
      </CardContent>
      <Separator />
      <CardFooter>
        <Field orientation="horizontal">
          <Button
            form="stock-form"
            type="submit"
            disabled={form.formState.isSubmitting}
            className={cn(
              "w-full",
              selectedType === "out" && "bed-red-500 hover:bg-red-600",
            )}
          >
            {form.formState.isSubmitting
              ? "Recording...."
              : selectedType === "in"
                ? "Record Stock In"
                : "Record Stock Out"}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};
