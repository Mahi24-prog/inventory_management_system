import { StatCard } from "@/components/dashboard/stat-card";
import {
  StockBarChart,
  CategoryPieChart,
} from "@/components/dashboard/stock-chart";
import { RecentTransaction } from "@/components/dashboard/recent-transaction";
import {
  PackageIcon,
  DollarSignIcon,
  AlertTriangleIcon,
  XCircleIcon,
} from "lucide-react";

/* Dummy Data import */
import { products } from "@/data/products";
/* Dummy Data import */

export default function DashboardPage() {
  /* Prior Calculations  */
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);
  const lowStock = products.filter(
    (p) => p.stock > 0 && p.stock <= p.minStock,
  ).length;
  const outOfStock = products.filter((p) => p.stock === 0).length;
  /* Prior Calculations  */
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stat Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Total Products"
          value={totalProducts}
          subtitle="Across all categories"
          icon={PackageIcon}
          color="indigo"
        />
        <StatCard
          title="Inventory Value"
          value={`$${totalValue.toLocaleString("en-US", { maximumFractionDigits: 0 })}`}
          subtitle="Current stock value"
          icon={DollarSignIcon}
          color="emerald"
        />
        <StatCard
          title="Low Stock"
          value={lowStock}
          subtitle="Item need restocking"
          icon={AlertTriangleIcon}
          color="amber"
        />
        <StatCard
          title="Out of stock"
          value={outOfStock}
          subtitle="Requires immediate action"
          icon={XCircleIcon}
          color="red"
        />
      </div>
      {/* Stat Cards Section */}

      {/* Charts Section  */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          <StockBarChart />
        </div>
        <CategoryPieChart />
      </div>
      {/* Charts Section  */}

      {/* Recent Transactions */}
      <RecentTransaction />
      {/* Recent Transactions */}
    </div>
  );
}
