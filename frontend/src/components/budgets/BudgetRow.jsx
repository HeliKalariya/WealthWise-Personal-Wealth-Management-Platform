import { Pencil, Trash2 } from "lucide-react";

export default function BudgetRow({ budget }) {
  const getProgressColor = (percentage) => {
    if (percentage >= 100) return "bg-red-500";
    if (percentage >= 85) return "bg-yellow-500";
    return "bg-emerald-500";
  };

  const getStatusBadge = (status) => {
    const styles = {
      good: "bg-green-100 text-green-700",
      warning: "bg-yellow-100 text-yellow-700",
      over: "bg-red-100 text-red-700",
    };
    return styles[status] || styles.good;
  };

  const getStatusLabel = (status) => {
    const labels = {
      good: "On Track",
      warning: "Near Limit",
      over: "Over Budget",
    };
    return labels[status] || "On Track";
  };

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="whitespace-nowrap px-6 py-4">
        <span className="font-medium text-gray-900">{budget.category}</span>
      </td>

      <td className="whitespace-nowrap px-6 py-4 text-gray-600">
        {budget.budgeted}
      </td>

      <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
        {budget.spent}
      </td>

      <td className="whitespace-nowrap px-6 py-4">
        <span className={`font-medium ${budget.remaining.startsWith("-") ? "text-red-600" : "text-green-600"}`}>
          {budget.remaining}
        </span>
      </td>

      <td className="px-6 py-4">
        <div className="w-full max-w-xs">
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${getProgressColor(budget.percentage)}`}
              style={{ width: `${Math.min(budget.percentage, 100)}%` }}
            />
          </div>
          <p className="mt-1 text-xs text-gray-500 text-right">
            {budget.percentage.toFixed(1)}%
          </p>
        </div>
      </td>

      <td className="whitespace-nowrap px-6 py-4">
        <div className="flex justify-center gap-3">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(budget.status)}`}>
            {getStatusLabel(budget.status)}
          </span>
          <div className="flex gap-2">
            <button className="rounded p-2 hover:bg-gray-100" title="Edit">
              <Pencil size={18} />
            </button>
            <button className="rounded p-2 text-red-500 hover:bg-red-50" title="Delete">
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
}