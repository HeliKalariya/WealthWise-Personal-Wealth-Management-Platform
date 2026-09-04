import { TrendingUp, IndianRupee, Minus, Plus } from "lucide-react";

export default function NetWorthSummary() {
  const netWorth = 427850;
  const totalAssets = 587500;
  const totalLiabilities = 159650;
  const monthlyChange = 3200;
  const monthlyChangePct = 0.75;

  const isPositive = netWorth >= 0;
  const monthlyIsPositive = monthlyChange >= 0;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {/* Net Worth */}
      <div className="rounded-2xl bg-white p-6 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 h-24 w-24 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-full" />
        <div className="relative flex items-start justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
              Net Worth
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
              ${netWorth.toLocaleString()}
            </h2>
            <p className={`mt-2 text-sm ${monthlyIsPositive ? "text-green-600" : "text-red-600"}`}>
              {monthlyIsPositive ? "+" : ""}${monthlyChange.toLocaleString()} ({monthlyIsPositive ? "+" : ""}{monthlyChangePct.toFixed(2)}% this month)
            </p>
          </div>
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <IndianRupee size={28} className="text-white" />
          </div>
        </div>
      </div>

      {/* Total Assets */}
      <div className="rounded-2xl bg-white p-6 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 h-24 w-24 bg-gradient-to-bl from-emerald-500/10 to-transparent rounded-full" />
        <div className="relative flex items-start justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
              Total Assets
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
              ${totalAssets.toLocaleString()}
            </h2>
            <p className="mt-2 text-sm text-emerald-600">
              +$12,400 (+2.2% this month)
            </p>
          </div>
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
            <TrendingUp size={28} className="text-white" />
          </div>
        </div>
      </div>

      {/* Total Liabilities */}
      <div className="rounded-2xl bg-white p-6 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 h-24 w-24 bg-gradient-to-bl from-red-500/10 to-transparent rounded-full" />
        <div className="relative flex items-start justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
              Total Liabilities
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
              ${totalLiabilities.toLocaleString()}
            </h2>
            <p className="mt-2 text-sm text-red-600">
              -$800 (-0.5% this month)
            </p>
          </div>
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center">
            <Minus size={28} className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
