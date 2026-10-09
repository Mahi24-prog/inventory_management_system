"use client";

import { useState } from "react";
import { StockTransaction } from "@/types";
import { StockForm } from "@/components/stock/stock-form";
import { TransactionLog } from "@/components/stock/transaction-log";

/* Dummy Data */
import { stockTransactions } from "@/data/products";
/* Dummy Data */

export default function StockPage() {
  const [transactions, setTransactions] = useState<StockTransaction[]>(
    [...stockTransactions].reverse(),
  );

  function handleNewTransaction(entry: {
    productId: string;
    productName: string;
    type: "in" | "out";
    quantity: number;
    reason: string;
  }) {
    const newTx: StockTransaction = {
      id: `t${Date.now()}`,
      ...entry,
      date: new Date().toISOString().split("T")[0],
      performedBy: "Mahendra",
    };
    setTransactions((prev) => [newTx, ...prev]);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
      <div className="lg:col-span-1">
        <StockForm onSuccess={handleNewTransaction} />
      </div>
      <div className="lg:col-span-2">
        <TransactionLog transactions={transactions} />
      </div>
    </div>
  );
}
