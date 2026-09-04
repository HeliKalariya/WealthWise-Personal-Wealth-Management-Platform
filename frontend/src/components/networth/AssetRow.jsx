import { Pencil, Trash2, Shield, Link2 } from "lucide-react";

const typeIcons = {
  Cash: "💵",
  Investments: "📈",
  Retirement: "🏦",
  "Real Estate": "🏠",
  Vehicle: "🚗",
  Crypto: "₿",
  Collectibles: "🎨",
  Other: "📦",
};

const typeColors = {
  Cash: "bg-green-100 text-green-700",
  Investments: "bg-blue-100 text-blue-700",
  Retirement: "bg-purple-100 text-purple-700",
  "Real Estate": "bg-amber-100 text-amber-700",
  Vehicle: "bg-orange-100 text-orange-700",
  Crypto: "bg-orange-100 text-orange-700",
  Collectibles: "bg-pink-100 text-pink-700",
  Other: "bg-gray-100 text-gray-700",
};

export default function AssetRow({ asset }) {
  const isPositive = asset.change >= 0;

  return (
    <div className="p-4 hover:bg-gray-50 transition flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex items-center gap-4 min-w-0 flex-1">
        <div className="h-12 w-12 rounded-xl bg-gray-100 flex items-center justify-center text-2xl flex-shrink-0">
          {typeIcons[asset.type] || typeIcons.Other}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-gray-900 truncate">{asset.name}</h4>
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${typeColors[asset.type] || typeColors.Other}`}>
              {asset.type}
            </span>
            {asset.liquid && <Shield size={14} className="text-emerald-600" title="Liquid Asset" />}
          </div>
          <p className="text-sm text-gray-500 truncate max-w-[200px]">{asset.institution}</p>
        </div>
      </div>

      <div className="flex flex-col sm:items-end gap-2 sm:flex-row sm:gap-6 w-full sm:w-auto">
        <div className="text-right">
          <p className="font-semibold text-gray-900">${asset.value.toLocaleString()}</p>
          <p className={`text-xs ${isPositive ? "text-green-600" : "text-red-600"}`}>
            {isPositive ? "+" : ""}${asset.change.toLocaleString()} ({isPositive ? "+" : ""}{asset.changePct.toFixed(1)}%)
          </p>
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
  );
}