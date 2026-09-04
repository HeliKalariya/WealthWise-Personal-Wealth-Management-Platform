import { useState } from "react";
import { Plus, Flag, Target, PiggyBank } from "lucide-react";
import AddGoalModal from "./AddGoalModal";

export default function GoalsHeader() {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("all"); // all, active, completed

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Left Section */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Goals
          </h1>

          <p className="mt-1 text-sm text-gray-500 sm:mt-2 sm:text-base">
            Set and track your financial milestones.
          </p>
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Filter Toggle */}
          <div className="flex rounded-xl bg-gray-100 p-1">
            <button
              onClick={() => setFilter("all")}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                filter === "all" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                filter === "active" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                filter === "completed" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Completed
            </button>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700 sm:w-auto"
          >
            <Plus size={18} />
            <span>Add Goal</span>
          </button>
        </div>
      </div>

      <AddGoalModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}