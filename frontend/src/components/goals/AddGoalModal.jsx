import { X } from "lucide-react";
import Modal from "../Modal";

const categories = [
  { value: "savings", label: "Savings", icon: "💰" },
  { value: "major_purchase", label: "Major Purchase", icon: "🏠" },
  { value: "travel", label: "Travel", icon: "✈️" },
  { value: "investment", label: "Investment", icon: "📈" },
  { value: "debt_payoff", label: "Debt Payoff", icon: "💳" },
  { value: "education", label: "Education", icon: "🎓" },
  { value: "emergency", label: "Emergency Fund", icon: "🛡️" },
  { value: "retirement", label: "Retirement", icon: "🏖️" },
  { value: "life_event", label: "Life Event", icon: "💍" },
  { value: "other", label: "Other", icon: "🎯" },
];

const icons = [
  "💰", "🏠", "✈️", "📈", "💳", "🎓", "🛡️", "🏖️", "💍", "🎯",
  "🚗", "💻", "📚", "🏥", "🎮", "🎨", "🏋️", "🌱", "🎁", "☕"
];

export default function AddGoalModal({ open, onClose }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <div className="mx-auto w-full max-w-xl rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h2 className="text-2xl font-bold text-slate-900">
            Add Financial Goal
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <form className="space-y-4 p-5">

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Goal Name
            </label>
            <input
              type="text"
              placeholder="e.g., Emergency Fund, House Down Payment..."
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Category
            </label>
            <select className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500">
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>{cat.icon} {cat.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Icon
            </label>
            <div className="flex flex-wrap gap-2">
              {icons.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  className="h-10 w-10 rounded-lg border-2 border-gray-200 hover:border-blue-500 text-xl transition"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Target Amount
              </label>
              <input
                type="number"
                placeholder="0.00"
                step="0.01"
                min="0"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Current Amount
              </label>
              <input
                type="number"
                placeholder="0.00"
                step="0.01"
                min="0"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Target Date
            </label>
            <input
              type="date"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Description (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="What's motivating this goal? Any specific milestones?"
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Linked Account (Optional)
            </label>
            <select className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500">
              <option value="">None - Manual Tracking</option>
              <option value="checking">Checking Account</option>
              <option value="savings">High-Yield Savings</option>
              <option value="investment">Investment Account</option>
              <option value="custom">Custom Account</option>
            </select>
          </div>

          {/* Footer */}
          <div className="flex flex-col-reverse gap-3 border-t pt-4 sm:flex-row sm:justify-end">

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Create Goal
            </button>

          </div>

        </form>

      </div>
    </Modal>
  );
}