import { X } from "lucide-react";
import Modal from "../Modal";

export default function AddIncomeModal({ open, onClose }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <div className="mx-auto w-full max-w-xl rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h2 className="text-2xl font-bold text-slate-900">
            Add Income
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
              Source
            </label>

            <input
              type="text"
              placeholder="Salary, Freelance, Dividends..."
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Amount
              </label>

              <input
                type="number"
                placeholder="0.00"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Date
              </label>

              <input
                type="date"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
              />
            </div>

          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Description
            </label>

            <textarea
              rows={3}
              placeholder="Optional notes..."
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
            />
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
              Save Income
            </button>

          </div>

        </form>

      </div>
    </Modal>
  );
}