import { useState } from "react";
import { Plus, TrendingUp, Calculator, RefreshCw } from "lucide-react";
import AddAssetModal from "./AddAssetModal";
import AddLiabilityModal from "./AddLiabilityModal";

export default function NetWorthHeader() {
  const [assetOpen, setAssetOpen] = useState(false);
  const [liabilityOpen, setLiabilityOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Left Section */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Net Worth
          </h1>

          <p className="mt-1 text-sm text-gray-500 sm:mt-2 sm:text-base">
            Track your assets and liabilities for a complete financial picture.
          </p>
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            onClick={() => setAssetOpen(true)}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-medium text-white transition hover:bg-emerald-700 sm:w-auto"
          >
            <Plus size={18} />
            <span>Add Asset</span>
          </button>

          <button
            onClick={() => setLiabilityOpen(true)}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-medium text-white transition hover:bg-red-700 sm:w-auto"
          >
            <Plus size={18} />
            <span>Add Liability</span>
          </button>
        </div>
      </div>

      <AddAssetModal
        open={assetOpen}
        onClose={() => setAssetOpen(false)}
      />

      <AddLiabilityModal
        open={liabilityOpen}
        onClose={() => setLiabilityOpen(false)}
      />
    </>
  );
}