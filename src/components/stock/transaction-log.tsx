import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowUpCircleIcon, ArrowDownCircleIcon } from "lucide-react";
import { StockTransaction } from "@/types";

interface Props {
  transactions: StockTransaction[];
}

export const TransactionLog = ({ transactions }: Props) => {
  if (transactions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Transaction Log</CardTitle>
        </CardHeader>
        <CardHeader>
          <p className="text-sm text-slate-400 text-center py-10">
            No Transaction yet. Record your first stock movement.
          </p>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">
          Transaction Log{" "}
          <span className="ml-2 text-sm font-normal text-slate-400">
            ({transactions.length} entries)
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-120 pr-4">
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-3 rounded-lg border bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  {tx.type === "in" ? (
                    <ArrowUpCircleIcon className="size-8 text-emerald-500 shrink-0" />
                  ) : (
                    <ArrowDownCircleIcon className="size-8 text-red-400 shrink-0" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      {tx.productName}
                    </p>
                    <p className="text-xs text-slate-400">
                      by {tx.performedBy}
                    </p>
                  </div>
                </div>
                <Badge variant={tx.type === "in" ? "success" : "destructive"}>
                  {tx.type === "in" ? "+" : "-"}
                  {tx.quantity} units
                </Badge>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
