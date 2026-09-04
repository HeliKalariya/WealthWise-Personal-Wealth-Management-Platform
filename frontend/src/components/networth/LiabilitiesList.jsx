import LiabilityRow from "./LiabilityRow";

const liabilities = [
  {
    id: 1,
    name: "Mortgage",
    type: "Mortgage",
    balance: 125000,
    originalAmount: 280000,
    interestRate: 6.25,
    monthlyPayment: 1750,
    institution: "Wells Fargo",
    remainingTerm: "22 years",
  },
  {
    id: 2,
    name: "Auto Loan",
    type: "Auto Loan",
    balance: 18500,
    originalAmount: 35000,
    interestRate: 4.99,
    monthlyPayment: 550,
    institution: "Chase Auto",
    remainingTerm: "2.5 years",
  },
  {
    id: 3,
    name: "Student Loan",
    type: "Student Loan",
    balance: 12500,
    originalAmount: 45000,
    interestRate: 5.50,
    monthlyPayment: 350,
    institution: "Federal Student Aid",
    remainingTerm: "3 years",
  },
  {
    id: 4,
    name: "Credit Card - Chase Sapphire",
    type: "Credit Card",
    balance: 3650,
    interestRate: 24.99,
    monthlyPayment: 500,
    institution: "Chase",
    remainingTerm: "Revolving",
  },
];

export default function LiabilitiesList() {
  const totalLiabilities = liabilities.reduce((sum, l) => sum + l.balance, 0);
  const totalMonthlyPayments = liabilities.reduce((sum, l) => sum + (l.monthlyPayment || 0), 0);

  return (
    <div className="rounded-2xl bg-white shadow-sm">
      <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Liabilities</h3>
        <div className="flex items-center gap-4 text-sm">
          <span className="font-medium text-red-600">
            Total: ${totalLiabilities.toLocaleString()}
          </span>
          <span className="text-gray-500">
            Monthly: ${totalMonthlyPayments.toLocaleString()}
          </span>
        </div>
      </div>
      <div className="divide-y">
        {liabilities.map((liability) => (
          <LiabilityRow key={liability.id} liability={liability} />
        ))}
      </div>
    </div>
  );
}