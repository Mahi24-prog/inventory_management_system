import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowDownCircleIcon, ArrowUpCircleIcon } from "lucide-react";

/* Dummy Data import */
import { stockTransactions } from "@/data/products";
/* Dummy Data import */

export const RecentTransaction = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Recent Transactions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-80">
          <div className="space-y-4 pr-4">
            {stockTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  {transaction.type === "in" ? (
                    <ArrowUpCircleIcon className="size-8 text-emerald-500 shrink-0" />
                  ) : (
                    <ArrowDownCircleIcon className="size-8 text-red-400 shrink-0" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      {transaction.productName}
                    </p>
                    <p className="text-xs text-slate-400">
                      {transaction.reason} . {transaction.date}
                    </p>
                  </div>
                </div>
                <Badge
                  variant={
                    transaction.type === "in" ? "success" : "destructive"
                  }
                >
                  {transaction.type === "in" ? "+" : "-"} {transaction.quantity}{" "}
                  units
                </Badge>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
