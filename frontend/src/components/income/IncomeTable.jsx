import IncomeRow from "./IncomeRow";

const incomes = [
  {
    date: "2025-07-15",
    source: "Salary",
    amount: "₹12,800",
    description: "Acme Corp — July",
  },
  {
    date: "2025-07-10",
    source: "Freelance",
    amount: "₹2,400",
    description: "Design Project",
  },
  {
    date: "2025-07-05",
    source: "Dividends",
    amount: "₹480",
    description: "Quarterly Dividend",
  },
];

export default function IncomeTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Horizontal scroll on small screens */}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-left">Source</th>
              <th className="px-6 py-4 text-left">Amount</th>
              <th className="px-6 py-4 text-left">Description</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {incomes.map((income, index) => (
              <IncomeRow key={index} income={income} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
