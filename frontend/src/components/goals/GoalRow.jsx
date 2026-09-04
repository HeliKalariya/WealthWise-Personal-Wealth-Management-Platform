import { Pencil, Trash2, Check, AlertTriangle } from "lucide-react";

export default function GoalRow({ goal }) {
  const progress = (goal.current / goal.target) * 100;
  const remaining = goal.target - goal.current;
  const isCompleted = goal.status === "completed";
  const daysLeft = Math.ceil((new Date(goal.targetDate) - new Date()) / (1000 * 60 * 60 * 24));

  const getProgressColor = () => {
    if (isCompleted) return "bg-green-500";
    if (progress >= 80) return "bg-yellow-500";
    if (progress >= 50) return "bg-blue-500";
    return "bg-emerald-500";
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className={`p-6 border-b last:border-0 ${isCompleted ? "bg-green-50" : ""} hover:bg-gray-50 transition`}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Left: Goal Info */}
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <div className={`h-12 w-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${goal.color}`}>
            {goal.icon}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <h3 className="font-semibold text-gray-900 truncate">{goal.name}</h3>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                isCompleted
                  ? "bg-green-100 text-green-700"
                  : daysLeft <= 30
                  ? "bg-red-100 text-red-700"
                  : "bg-blue-100 text-blue-700"
              }`}>
                {isCompleted ? (
                  <>
                    <Check size={12} className="mr-1" />
                    Completed
                  </>
                ) : daysLeft <= 30 ? (
                  <>
                    <AlertTriangle size={12} className="mr-1" />
                    {daysLeft} days left
                  </>
                ) : (
                  "In Progress"
                )}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">{goal.category} • Target: {formatCurrency(goal.target)}</p>
          </div>
        </div>

        {/* Center: Progress */}
        <div className="w-full sm:w-64">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="font-medium text-gray-900">
              {formatCurrency(goal.current)} / {formatCurrency(goal.target)}
            </span>
            <span className={`font-semibold ${isCompleted ? "text-green-600" : progress >= 80 ? "text-yellow-600" : "text-blue-600"}`}>
              {progress.toFixed(1)}%
            </span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${getProgressColor()}`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          {!isCompleted && (
            <p className="mt-1 text-xs text-gray-500 text-right">
              {formatCurrency(remaining)} remaining • {daysLeft > 0 ? `${daysLeft} days left` : "Past due"}
            </p>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:justify-end">
          {!isCompleted && (
            <button className="rounded-lg bg-green-100 text-green-700 px-3 py-1.5 text-sm font-medium hover:bg-green-200 transition flex items-center gap-1">
              <Check size={14} />
              Add Progress
            </button>
          )}
          <button className="rounded p-2 hover:bg-gray-100" title="Edit">
            <Pencil size={18} />
          </button>
          <button className="rounded p-2 text-red-500 hover:bg-red-50" title="Delete">
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
