import IncomeCard from "./IncomeCard";
import { TrendingUp } from "lucide-react";

export default function IncomeStats() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <IncomeCard
        title="TOTAL THIS YEAR"
        amount="₹90,840"
        change="+18%"
        subtitle="vs last period"
        icon={<TrendingUp size={22} />}
      />

      <IncomeCard
        title="THIS MONTH"
        amount="₹12,800"
        change="+4%"
        subtitle="vs last period"
        icon={<TrendingUp size={22} />}
      />

      <IncomeCard
        title="AVG. MONTHLY"
        amount="₹13,480"
        change="+7%"
        subtitle="vs last period"
        icon={<TrendingUp size={22} />}
      />
    </div>
  );
}
