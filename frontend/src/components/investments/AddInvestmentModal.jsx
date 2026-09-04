import { X } from "lucide-react";
import Modal from "../Modal";

const assetTypes = [
  { value: "stock", label: "Stock" },
  { value: "etf", label: "ETF" },
  { value: "bond", label: "Bond" },
  { value: "mutual_fund", label: "Mutual Fund" },
  { value: "crypto", label: "Cryptocurrency" },
  { value: "reit", label: "REIT" },
  { value: "other", label: "Other" },
];

const sectors = [
  "Technology",
  "Healthcare",
  "Financial Services",
  "Consumer Cyclical",
  "Consumer Defensive",
  "Industrials",
  "Energy",
  "Utilities",
  "Real Estate",
  "Communication Services",
  "Basic Materials",
  "Diversified",
  "International",
  "Fixed Income",
  "Dividend",
  "Other",
];

export default function AddInvestmentModal({ open, onClose }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <div className="mx-auto w-full max-w-xl rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h2 className="text-2xl font-bold text-slate-900">
            Add Investment
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

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Symbol / Ticker
              </label>
              <input
                type="text"
                placeholder="AAPL, VTI, etc."
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 uppercase"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Asset Type
              </label>
              <select className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500">
                {assetTypes.map((type) => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              placeholder="Apple Inc., Vanguard Total Stock Market ETF..."
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Shares / Units
              </label>
              <input
                type="number"
                placeholder="0"
                step="0.001"
                min="0"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Avg Cost / Share
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
                Current Price
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

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Sector / Category
              </label>
              <select className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500">
                {sectors.map((sector) => (
                  <option key={sector} value={sector}>{sector}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Purchase Date
              </label>
              <input
                type="date"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Notes (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="Investment thesis, dividend info, etc."
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
              Add Investment
            </button>

          </div>

        </form>

      </div>
    </Modal>
  );
}