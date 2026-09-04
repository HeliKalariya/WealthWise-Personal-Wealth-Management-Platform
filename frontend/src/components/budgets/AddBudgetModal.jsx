import { X } from "lucide-react";
import Modal from "../Modal";

const categories = [
  "Housing",
  "Transportation",
  "Food & Dining",
  "Utilities",
  "Entertainment",
  "Shopping",
  "Healthcare",
  "Personal Care",
  "Education",
  "Savings",
  "Insurance",
  "Other",
];

export default function AddBudgetModal({ open, onClose }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <div className="mx-auto w-full max-w-xl rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h2 className="text-2xl font-bold text-slate-900">
            Add Budget
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
              Category
            </label>

            <select
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
            >
              <option value="">Select a category...</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Budgeted Amount
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
                Period
              </label>

              <select
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
              >
                <option value="monthly">Monthly</option>
                <option value="weekly">Weekly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>

          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Start Date
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
              placeholder="Notes about this budget..."
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
            />
          </div>

          {/* Alert Threshold */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Alert Threshold
            </label>

            <select
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
            >
              <option value="80">80% - Early Warning</option>
              <option value="90" selected>90% - Near Limit</option>
              <option value="100">100% - Over Budget</option>
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
              Save Budget
            </button>

          </div>

        </form>

      </div>
    </Modal>
  );
}