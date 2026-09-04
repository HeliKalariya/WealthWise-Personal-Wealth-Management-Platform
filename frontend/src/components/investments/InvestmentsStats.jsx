import InvestmentCard from "./InvestmentCard";
import { TrendingUp, IndianRupee, PieChart, BarChart2 } from "lucide-react";

export default function InvestmentsStats() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <InvestmentCard
        title="PORTFOLIO VALUE"
        amount="$127,450"
        change="+$12,450"
        subtitle="+10.8% overall"
        icon={<IndianRupee size={22} />}
        trend="up"
      />

      <InvestmentCard
        title="TOTAL GAIN/LOSS"
        amount="+$18,230"
        change="+16.7%"
        subtitle="since inception"
        icon={<TrendingUp size={22} />}
        trend="up"
      />

      <InvestmentCard
        title="TODAY'S CHANGE"
        amount="+$342"
        change="+0.27%"
        subtitle="vs yesterday"
        icon={<BarChart2 size={22} />}
        trend="up"
      />

      <InvestmentCard
        title="DIVIDEND YIELD"
        amount="2.4%"
        change="$3,058"
        subtitle="annual income"
        icon={<PieChart size={22} />}
        trend="neutral"
      />
    </div>
  );
}
