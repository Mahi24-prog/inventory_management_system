import { cn } from "@/lib/utils";

import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  color: "indigo" | "emerald" | "amber" | "red";
}

const colorMap = {
  indigo: "bg-indigo-50 text-indigo-600",
  emerald: "bg-emerald-50 text-emerald-600",
  amber: "bg-amber-50 text-amber-600",
  red: "bg-red-50 text-red-600",
};

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
}: Props) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500 font-medium">{title}</p>
            <p className="text-3xl font-bold text-slate-800 mt-1">{value}</p>
            <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
          </div>
          <div className={cn("p-3 rounded-xl", colorMap[color])}>
            <Icon className="size-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
