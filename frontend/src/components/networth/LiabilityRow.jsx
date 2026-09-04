import { Pencil, Trash2, Link2, AlertTriangle } from "lucide-react";

const typeIcons = {
  Mortgage: "🏠",
  "Auto Loan": "🚗",
  "Student Loan": "🎓",
  "Credit Card": "💳",
  "Personal Loan": "💰",
  "Medical Debt": "🏥",
  Other: "📋",
};

const typeColors = {
  Mortgage: "bg-blue-100 text-blue-700",
  "Auto Loan": "bg-orange-100 text-orange-700",
  "Student Loan": "bg-purple-100 text-purple-700",
  "Credit Card": "bg-red-100 text-red-700",
  "Personal Loan": "bg-gray-100 text-gray-700",
  "Medical Debt": "bg-pink-100 text-pink-700",
  Other: "bg-gray-100 text-gray-700",
};

export default function LiabilityRow({ liability }) {
  const progress = liability.originalAmount ? ((liability.originalAmount - liability.balance) / liability.originalAmount) * 100 : 0;

  return (
    <div className="p-4 hover:bg-gray-50 transition">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <div className="h-12 w-12 rounded-xl bg-gray-100 flex items-center justify-center text-2xl flex-shrink-0">
            {typeIcons[liability.type] || typeIcons.Other}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="font-medium text-gray-900 truncate">{liability.name}</h4>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${typeColors[liability.type] || typeColors.Other}`}>
                {liability.type}
              </span>
              {liability.interestRate > 20 && (
                <AlertTriangle size={14} className="text-red-500" title="High Interest Rate" />
              )}
            </div>
            <p className="text-sm text-gray-500 truncate max-w-[200px]">{liability.institution}</p>
          </div>
        </div>

        <div className="flex flex-col sm:items-end gap-2 sm:flex-row sm:gap-6 w-full sm:w-auto">
          <div className="text-right">
            <p className="font-semibold text-gray-900">${liability.balance.toLocaleString()}</p>
            <p className="text-xs text-gray-500">
              {liability.monthlyPayment ? `$${liability.monthlyPayment}/mo` : "No payment"} • {liability.remainingTerm}
            </p>
            {liability.originalAmount && (
              <div className="mt-1 w-full sm:w-48">
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-500 rounded-full transition-all"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 text-right mt-0.5">
                  {progress.toFixed(1)}% paid off
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2">
            <div className="text-right text-xs text-gray-500">
              <p>APR: <span className="font-medium text-gray-900">{liability.interestRate.toFixed(2)}%</span></p>
            </div>
            <div className="flex items-center gap-2">
              <button className="rounded p-2 hover:bg-gray-100" title="Edit">
                <Pencil size={18} />
              </button>
              <button className="rounded p-2 hover:bg-gray-100" title="Link Account">
                <Link2 size={18} />
              </button>
              <button className="rounded p-2 text-red-500 hover:bg-red-50" title="Delete">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}