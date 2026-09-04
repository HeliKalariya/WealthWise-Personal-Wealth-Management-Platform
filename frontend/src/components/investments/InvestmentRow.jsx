import { Pencil, Trash2, ExternalLink } from "lucide-react";

export default function InvestmentRow({ holding }) {
  const isGain = holding.gainLoss >= 0;

  const typeColors = {
    Stock: "bg-blue-100 text-blue-700",
    ETF: "bg-green-100 text-green-700",
    Bond: "bg-purple-100 text-purple-700",
    Crypto: "bg-orange-100 text-orange-700",
    Other: "bg-gray-100 text-gray-700",
  };

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="whitespace-nowrap px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
            {holding.symbol.charAt(0)}
          </div>
          <div>
            <p className="font-medium text-gray-900">{holding.symbol}</p>
            <p className="text-xs text-gray-500 truncate max-w-[150px]">{holding.name}</p>
          </div>
        </div>
      </td>

      <td className="whitespace-nowrap px-6 py-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeColors[holding.type] || typeColors.Other}`}>
          {holding.type}
        </span>
      </td>

      <td className="whitespace-nowrap px-6 py-4 text-right text-gray-600">
        {holding.shares.toLocaleString()}
      </td>

      <td className="whitespace-nowrap px-6 py-4 text-right text-gray-600">
        ${holding.avgCost.toFixed(2)}
      </td>

      <td className="whitespace-nowrap px-6 py-4 text-right font-medium text-gray-900">
        ${holding.currentPrice.toFixed(2)}
      </td>

      <td className="whitespace-nowrap px-6 py-4 text-right font-semibold text-gray-900">
        ${holding.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </td>

      <td className="whitespace-nowrap px-6 py-4 text-right">
        <span className={`font-semibold ${isGain ? "text-green-600" : "text-red-600"}`}>
          {isGain ? "+" : ""}${holding.gainLoss.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          <span className="ml-1 text-sm font-normal">
            ({isGain ? "+" : ""}{holding.gainLossPct.toFixed(1)}%)
          </span>
        </span>
      </td>

      <td className="whitespace-nowrap px-6 py-4">
        <div className="flex justify-center gap-2">
          <button className="rounded p-2 hover:bg-gray-100" title="Edit">
            <Pencil size={16} />
          </button>
          <button className="rounded p-2 hover:bg-gray-100" title="View Details">
            <ExternalLink size={16} />
          </button>
          <button className="rounded p-2 text-red-500 hover:bg-red-50" title="Delete">
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}