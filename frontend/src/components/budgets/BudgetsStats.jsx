import BudgetCard from "./BudgetCard";
import { TrendingDown, TrendingUp, IndianRupee } from "lucide-react";

export default function BudgetsStats() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <BudgetCard
        title="TOTAL BUDGETED"
        amount="$8,500"
        change="+$500"
        subtitle="vs last month"
        icon={<IndianRupee size={22} />}
        trend="up"
      />

      <BudgetCard
        title="SPENT THIS MONTH"
        amount="$5,240"
        change="61.6%"
        subtitle="of budget used"
        icon={<TrendingUp size={22} />}
        trend="neutral"
      />

      <BudgetCard
        title="REMAINING"
        amount="$3,260"
        change="$3,260"
        subtitle="available to spend"
        icon={<TrendingDown size={22} />}
        trend="down"
      />

      <BudgetCard
        title="OVER BUDGET"
        amount="$180"
        change="2 categories"
        subtitle="need attention"
        icon={<TrendingUp size={22} />}
        trend="up"
        alert
      />
    </div>
  );
}
