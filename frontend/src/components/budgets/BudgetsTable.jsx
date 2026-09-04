import BudgetRow from "./BudgetRow";

const budgets = [
  {
    id: 1,
    category: "Housing",
    budgeted: "$2,000",
    spent: "$1,850",
    remaining: "$150",
    percentage: 92.5,
    status: "warning",
  },
  {
    id: 2,
    category: "Transportation",
    budgeted: "$600",
    spent: "$420",
    remaining: "$180",
    percentage: 70,
    status: "good",
  },
  {
    id: 3,
    category: "Food & Dining",
    budgeted: "$800",
    spent: "$980",
    remaining: "-$180",
    percentage: 122.5,
    status: "over",
  },
  {
    id: 4,
    category: "Utilities",
    budgeted: "$350",
    spent: "$290",
    remaining: "$60",
    percentage: 82.9,
    status: "good",
  },
  {
    id: 5,
    category: "Entertainment",
    budgeted: "$300",
    spent: "$150",
    remaining: "$150",
    percentage: 50,
    status: "good",
  },
  {
    id: 6,
    category: "Shopping",
    budgeted: "$400",
    spent: "$480",
    remaining: "-$80",
    percentage: 120,
    status: "over",
  },
  {
    id: 7,
    category: "Healthcare",
    budgeted: "$250",
    spent: "$120",
    remaining: "$130",
    percentage: 48,
    status: "good",
  },
  {
    id: 8,
    category: "Personal Care",
    budgeted: "$200",
    spent: "$180",
    remaining: "$20",
    percentage: 90,
    status: "warning",
  },
];

export default function BudgetsTable() {
  return (
    <div className="rounded-2xl bg-white shadow-sm">
      {/* Horizontal scroll on small screens */}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left">Category</th>
              <th className="px-6 py-4 text-left">Budgeted</th>
              <th className="px-6 py-4 text-left">Spent</th>
              <th className="px-6 py-4 text-left">Remaining</th>
              <th className="px-6 py-4 text-left">Progress</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {budgets.map((budget) => (
              <BudgetRow key={budget.id} budget={budget} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}