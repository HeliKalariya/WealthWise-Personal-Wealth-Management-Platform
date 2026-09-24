import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  TrendingDown,
  TrendingUp,
  WalletCards,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { api } from "../api/client";
import { useAuth } from "../context/AuthContext";

const rupees = (amount) =>
  `₹${new Intl.NumberFormat("en-IN").format(amount || 0)}`;
const pieColors = [
  "#2563eb",
  "#64748b",
  "#06b6d4",
  "#8b5cf6",
  "#ef4444",
  "#f59e0b",
  "#10b981",
];

/** Render one bordered financial summary card from the dashboard reference. */
function SummaryCard({
  label,
  value,
  Icon,
  accent,
  iconColor,
  note,
  positive = true,
}) {
  const ChangeIcon = positive ? ArrowUpRight : ArrowDownRight;
  return (
    <article
      className={`rounded-2xl border-t-4 ${accent} bg-white p-6 shadow-[0_5px_16px_rgba(15,23,42,0.05)]`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium tracking-wide text-slate-500">
            {label}
          </p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-[38px]">
            {rupees(value)}
          </p>
        </div>
        <span
          className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl ${iconColor} text-white`}
        >
          <Icon size={27} />
        </span>
      </div>
      <p
        className={`mt-4 flex items-center gap-1 text-sm font-medium ${positive ? "text-emerald-500" : "text-rose-500"}`}
      >
        <ChangeIcon size={16} /> {note}
      </p>
    </article>
  );
}

/** Display the dashboard using live values calculated by the MongoDB API. */
export default function Dashboard() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  /** Load dashboard totals, graphs and recent records from the backend. */
  useEffect(() => {
    const loadDashboard = async () => {
      try { setData(await api("/dashboard")); } catch (requestError) { setError(requestError.message); }
    };
    void loadDashboard();
  }, []);

  /** Calculate current-month figures and trend labels from the backend chart points. */
  const metrics = useMemo(() => {
    const chart = data?.monthlyChart || [];
    const latest = chart.at(-1) || { income: 0, expenses: 0 };
    const previous = chart.at(-2) || { income: 0, expenses: 0 };
    const change = (value, oldValue) =>
      oldValue
        ? `${Math.abs(Math.round(((value - oldValue) / oldValue) * 100))}% vs last month`
        : "No previous month";
    return {
      income: latest.income,
      expenses: latest.expenses,
      incomeNote: change(latest.income, previous.income),
      expenseNote: change(latest.expenses, previous.expenses),
      incomeUp: latest.income >= previous.income,
      expensesUp: latest.expenses <= previous.expenses,
    };
  }, [data]);

  const summary = data?.summary || {};
  /** Fall back to recent records while the backend is restarted after a dashboard update. */
  const chartData = useMemo(() => {
    if (data?.monthlyChart?.length) return data.monthlyChart;
    const months = new Map();
    for (let offset = 7; offset >= 0; offset -= 1) {
      const date = new Date();
      date.setDate(1);
      date.setMonth(date.getMonth() - offset);
      months.set(`${date.getFullYear()}-${date.getMonth()}`, {
        month: date.toLocaleString("en-IN", { month: "short" }),
        income: 0,
        expenses: 0,
      });
    }
    for (const transaction of data?.recentTransactions || []) {
      const date = new Date(transaction.date);
      const point = months.get(`${date.getFullYear()}-${date.getMonth()}`);
      if (point)
        point[transaction.type === "income" ? "income" : "expenses"] +=
          transaction.amount;
    }
    return [...months.values()];
  }, [data]);
  const categories = useMemo(() => {
    if (data?.expenseCategories?.length) return data.expenseCategories;
    const totals = {};
    for (const transaction of data?.recentTransactions || [])
      if (transaction.type === "expense")
        totals[transaction.category] =
          (totals[transaction.category] || 0) + transaction.amount;
    return Object.entries(totals).map(([name, value]) => ({ name, value }));
  }, [data]);

  return (
    <section className="mx-auto max-w-[1480px]">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-[38px]">
            Good afternoon, {user?.name?.split(" ")[0] || "there"} 
          </h1>
          <p className="mt-1 text-base text-slate-500">
            Here's a snapshot of your financial life today.
          </p>
        </div>
      </div>
      {error && <p className="mt-4 text-rose-500">{error}</p>}

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <SummaryCard
          label="TOTAL BALANCE"
          value={summary.totalBalance}
          Icon={WalletCards}
          accent="border-indigo-500"
          iconColor="bg-indigo-500"
          note="All saved transactions"
        />
        <SummaryCard
          label="MONTHLY INCOME"
          value={metrics.income}
          Icon={TrendingUp}
          accent="border-emerald-500"
          iconColor="bg-emerald-500"
          note={metrics.incomeNote}
          positive={metrics.incomeUp}
        />
        <SummaryCard
          label="MONTHLY EXPENSES"
          value={metrics.expenses}
          Icon={TrendingDown}
          accent="border-orange-500"
          iconColor="bg-orange-500"
          note={metrics.expenseNote}
          positive={metrics.expensesUp}
        />
      </div>

      <div className="mt-8 grid gap-5 xl:grid-cols-[2fr_1fr]">
        <article className="rounded-2xl bg-white p-6 shadow-[0_5px_16px_rgba(15,23,42,0.05)] sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-950">
                Income vs Expenses
              </h2>
              <p className="mt-1 text-sm text-slate-500">Last 8 months</p>
            </div>
            <div className="flex gap-4 text-sm">
              <span className="flex items-center gap-2">
                <i className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                Income
              </span>
              <span className="flex items-center gap-2">
                <i className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                Expenses
              </span>
            </div>
          </div>
          <div className="mt-6" style={{ height: 290, minHeight: 290 }}>
            <ResponsiveContainer width="100%" height={290} minHeight={290}>
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 6, left: -12, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="incomeFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity={0.24} />
                    <stop
                      offset="100%"
                      stopColor="#2563eb"
                      stopOpacity={0.01}
                    />
                  </linearGradient>
                  <linearGradient id="expenseFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.2} />
                    <stop
                      offset="100%"
                      stopColor="#f59e0b"
                      stopOpacity={0.01}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  vertical={false}
                  stroke="#dbe5f1"
                  strokeDasharray="4 4"
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 13 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 13 }}
                  tickFormatter={(value) => `₹${Math.round(value / 1000)}k`}
                />
                <Tooltip
                  contentStyle={{ borderRadius: 12, borderColor: "#e2e8f0" }}
                  formatter={(value) => rupees(value)}
                />
                <Area
                  type="monotone"
                  dataKey="income"
                  name="Income"
                  stroke="#2563eb"
                  strokeWidth={3}
                  fill="url(#incomeFill)"
                  activeDot={{ r: 5 }}
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  name="Expenses"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  fill="url(#expenseFill)"
                  activeDot={{ r: 5 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>
        <article className="rounded-2xl bg-white p-6 shadow-[0_5px_16px_rgba(15,23,42,0.05)] sm:p-8">
          <h2 className="text-xl font-bold text-slate-950">
            Expense Categories
          </h2>
          <p className="mt-1 text-sm text-slate-500">All saved expenses</p>
          <div className="mt-4" style={{ height: 300, minHeight: 300 }}>
            <ResponsiveContainer width="100%" height={300} minHeight={300}>
              <PieChart>
                <Pie
                  data={categories}
                  dataKey="value"
                  nameKey="name"
                  innerRadius="53%"
                  outerRadius="76%"
                  paddingAngle={3}
                  stroke="none"
                >
                  {categories.map((category, index) => (
                    <Cell
                      key={category.name}
                      fill={pieColors[index % pieColors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: 12, borderColor: "#e2e8f0" }}
                  formatter={(value) => rupees(value)}
                />
                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {categories.length === 0 && (
            <p className="-mt-44 text-center text-sm text-slate-500">
              Add expenses to view categories.
            </p>
          )}
        </article>
      </div>

      <div className="mt-8 grid gap-5 xl:grid-cols-[2fr_1fr]">
        <article className="overflow-x-auto rounded-2xl bg-white shadow-[0_5px_16px_rgba(15,23,42,0.05)]">
          <div className="flex items-center justify-between p-6 sm:p-8">
            <h2 className="text-xl font-bold text-slate-950">
              Recent Transactions
            </h2>
            <span className="text-sm font-semibold text-blue-600">
              View all →
            </span>
          </div>
          <table className="w-full min-w-[700px]">
            <thead className="border-b border-slate-200 text-slate-500">
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {data?.recentTransactions?.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-slate-200 last:border-0"
                >
                  <td>{new Date(item.date).toLocaleDateString("en-CA")}</td>
                  <td>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                      {item.category}
                    </span>
                  </td>
                  <td className="font-medium text-slate-800">
                    {item.description || "—"}
                  </td>
                  <td
                    className={
                      item.type === "income"
                        ? "font-bold text-emerald-500"
                        : "font-bold text-slate-900"
                    }
                  >
                    {item.type === "income" ? "+" : "-"}
                    {rupees(item.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {data && data.recentTransactions.length === 0 && (
            <p className="p-8 text-center text-slate-500">
              Add income or expense transactions to see them here.
            </p>
          )}
        </article>
        <div className="grid gap-5">
          <article className="rounded-2xl bg-white p-6 shadow-[0_5px_16px_rgba(15,23,42,0.05)]">
            <h2 className="text-xl font-bold">Monthly Budget</h2>
            <p className="mt-2 text-slate-500">
              {rupees(summary.remainingBudget)} remaining
            </p>
            <p className="mt-5 text-3xl font-bold">
              {rupees(summary.monthlyBudgetSpent)}
            </p>
            <p className="text-sm text-slate-500">
              of {rupees(summary.budgeted)} spent
            </p>
            <div className="mt-5 h-3 rounded-full bg-blue-100">
              <div
                className="h-full rounded-full bg-blue-600"
                style={{
                  width: `${summary.budgeted ? Math.min(100, (summary.monthlyBudgetSpent / summary.budgeted) * 100) : 0}%`,
                }}
              />
            </div>
          </article>
          <article className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-500 p-6 text-white shadow-[0_5px_16px_rgba(15,23,42,0.12)]">
            <p className="text-sm font-medium tracking-wide text-blue-100">
              TOP GOAL
            </p>
            {data?.goals?.[0] ? (
              <>
                <h2 className="mt-3 text-2xl font-bold">
                  {data.goals[0].name}
                </h2>
                <div className="mt-5 flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-bold">
                      {rupees(data.goals[0].current)}
                    </p>
                    <p className="text-sm text-blue-100">
                      of {rupees(data.goals[0].target)}
                    </p>
                  </div>
                  <p className="text-3xl font-bold text-amber-300">
                    {Math.round(
                      (data.goals[0].current / data.goals[0].target) * 100,
                    )}
                    %
                  </p>
                </div>
              </>
            ) : (
              <p className="mt-4 text-blue-100">
                Create a goal to see it here.
              </p>
            )}
          </article>
        </div>
      </div>
    </section>
  );
}
