"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  LabelList,
} from "recharts";

/* Dummy Data Imported  */
import { monthlyStockData, categoryDistribution } from "@/data/products";
/* Dummy Data Imported  */

/* Check later Chat config !Important*/
const barChartConfig = {
  stockIn: {
    label: "Stock In",
    color: "var(--chart-1)",
  },
  stockOut: {
    label: "Stock Out",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;
/* Check later Chat config !Important*/

export const StockBarChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Stock Movement - Last 6 Months
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={barChartConfig} className="w-full h-72">
          <BarChart accessibilityLayer data={monthlyStockData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="stockIn"
              fill="var(--chart-1)"
              name="Stock In"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="stockOut"
              fill="var(--chart-2)"
              name="Stock Out"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

const pieChartConfig = {
  Electronics: {
    label: "Electronics",
    color: "var(--chart-1)",
  },
  Clothing: {
    label: "Clothing",
    color: "var(--chart-2)",
  },
  Food: {
    label: "Food & Bev",
    color: "var(--chart-3)",
  },
  Office: {
    label: "Office",
    color: "var(--chart-4)",
  },
  Tools: {
    label: "Tools",
    color: "var(--chart-5)",
  },
  Health: {
    label: "Health",
    color: "var(--chart-6)",
  },
} satisfies ChartConfig;

export const CategoryPieChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Stock Distribution by Category{" "}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={pieChartConfig}
          className="mx-auto aspect-square max-h-72 [&_.recharts-text]:fill-background"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent nameKey="name" hideLabel />}
            />
            <Pie data={categoryDistribution} dataKey="value">
              <LabelList
                dataKey="name"
                stroke="none"
                className="fill-background"
                fontSize={10}
                formatter={(value) => {
                  return pieChartConfig[value as keyof typeof pieChartConfig]
                    ?.label;
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
