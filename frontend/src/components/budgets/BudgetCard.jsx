export default function BudgetCard({
  title,
  amount,
  change,
  subtitle,
  icon,
  trend = "up",
  alert = false,
}) {
  const trendColors = {
    up: "text-green-600 bg-green-50",
    down: "text-red-600 bg-red-50",
    neutral: "text-blue-600 bg-blue-50",
  };

  const iconBgColors = {
    up: "bg-emerald-500",
    down: "bg-red-500",
    neutral: "bg-blue-500",
  };

  const alertStyle = alert ? "ring-2 ring-red-200" : "";

  return (
    <div className={`rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md ${alertStyle}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
            {title}
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
            {amount}
          </h2>

          <p className={`mt-2 text-sm ${trendColors[trend]}`}>
            {change} {subtitle}
          </p>
        </div>

        <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${iconBgColors[trend]} text-white sm:h-14 sm:w-14`}>
          {icon}
        </div>
      </div>
    </div>
  );
}