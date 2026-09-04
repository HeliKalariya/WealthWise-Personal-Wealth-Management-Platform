import { useState } from "react";
import { Plus, BarChart2, PieChart } from "lucide-react";
import AddInvestmentModal from "./AddInvestmentModal";

export default function InvestmentsHeader() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState("holdings"); // holdings, performance, allocation

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Left Section */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Investments
          </h1>

          <p className="mt-1 text-sm text-gray-500 sm:mt-2 sm:text-base">
            Track your portfolio performance and holdings.
          </p>
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* View Toggle */}
          <div className="flex rounded-xl bg-gray-100 p-1">
            <button
              onClick={() => setView("holdings")}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                view === "holdings" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Holdings
            </button>
            <button
              onClick={() => setView("performance")}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                view === "performance" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Performance
            </button>
            <button
              onClick={() => setView("allocation")}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                view === "allocation" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Allocation
            </button>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700 sm:w-auto"
          >
            <Plus size={18} />
            <span>Add Investment</span>
          </button>
        </div>
      </div>

      <AddInvestmentModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}