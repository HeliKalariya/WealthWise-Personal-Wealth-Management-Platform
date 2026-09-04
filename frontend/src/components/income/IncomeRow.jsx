import { Pencil, Trash2 } from "lucide-react";

export default function IncomeRow({ income }) {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="whitespace-nowrap px-6 py-4">{income.date}</td>

      <td className="whitespace-nowrap px-6 py-4">
        <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
          {income.source}
        </span>
      </td>

      <td className="whitespace-nowrap px-6 py-4 font-semibold text-green-600">
        {income.amount}
      </td>

      <td className="whitespace-nowrap px-6 py-4">
        {income.description}
      </td>

      <td className="whitespace-nowrap px-6 py-4">
        <div className="flex justify-center gap-3">
          <button className="rounded p-2 hover:bg-gray-100">
            <Pencil size={18} />
          </button>

          <button className="rounded p-2 text-red-500 hover:bg-red-50">
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}