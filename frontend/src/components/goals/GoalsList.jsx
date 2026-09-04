import GoalRow from "./GoalRow";

const goals = [
  {
    id: 1,
    name: "Emergency Fund",
    target: 25000,
    current: 18500,
    targetDate: "2025-12-31",
    category: "Savings",
    icon: "🛡️",
    color: "bg-blue-500",
    status: "active",
  },
  {
    id: 2,
    name: "House Down Payment",
    target: 50000,
    current: 32000,
    targetDate: "2026-06-30",
    category: "Major Purchase",
    icon: "🏠",
    color: "bg-green-500",
    status: "active",
  },
  {
    id: 3,
    name: "Vacation to Japan",
    target: 8000,
    current: 8000,
    targetDate: "2025-08-15",
    category: "Travel",
    icon: "🗾",
    color: "bg-purple-500",
    status: "completed",
  },
  {
    id: 4,
    name: "Retirement Portfolio",
    target: 100000,
    current: 12000,
    targetDate: "2035-12-31",
    category: "Investment",
    icon: "📈",
    color: "bg-orange-500",
    status: "active",
  },
  {
    id: 5,
    name: "New Car",
    target: 30000,
    current: 5500,
    targetDate: "2026-03-31",
    category: "Major Purchase",
    icon: "🚗",
    color: "bg-red-500",
    status: "active",
  },
  {
    id: 6,
    name: "Wedding Fund",
    target: 15000,
    current: 2500,
    targetDate: "2027-06-01",
    category: "Life Event",
    icon: "💍",
    color: "bg-pink-500",
    status: "active",
  },
];

export default function GoalsList() {
  return (
    <div className="rounded-2xl bg-white shadow-sm">
      <div className="divide-y">
        {goals.map((goal) => (
          <GoalRow key={goal.id} goal={goal} />
        ))}
      </div>
    </div>
  );
}