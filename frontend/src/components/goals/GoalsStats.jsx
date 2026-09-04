import GoalCard from "./GoalCard";
import { Flag, Target, PiggyBank, CheckCircle } from "lucide-react";

export default function GoalsStats() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <GoalCard
        title="TOTAL GOALS"
        amount="8"
        change="3 completed"
        subtitle="5 in progress"
        icon={<Flag size={22} />}
        trend="neutral"
      />

      <GoalCard
        title="TOTAL TARGET"
        amount="$125,000"
        change="$78,500"
        subtitle="saved so far"
        icon={<Target size={22} />}
        trend="up"
      />

      <GoalCard
        title="CURRENT PROGRESS"
        amount="62.8%"
        change="$46,500"
        subtitle="remaining to goal"
        icon={<PiggyBank size={22} />}
        trend="neutral"
      />

      <GoalCard
        title="THIS MONTH"
        amount="$2,400"
        change="+$400"
        subtitle="vs last month"
        icon={<CheckCircle size={22} />}
        trend="up"
      />
    </div>
  );
}