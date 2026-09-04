import AssetRow from "./AssetRow";

const assets = [
  {
    id: 1,
    name: "Checking Account",
    type: "Cash",
    value: 12500,
    institution: "Chase Bank",
    change: 500,
    changePct: 4.2,
    liquid: true,
  },
  {
    id: 2,
    name: "High-Yield Savings",
    type: "Cash",
    value: 25000,
    institution: "Ally Bank",
    change: 120,
    changePct: 0.5,
    liquid: true,
  },
  {
    id: 3,
    name: "Brokerage Account",
    type: "Investments",
    value: 127450,
    institution: "Fidelity",
    change: 3200,
    changePct: 2.6,
    liquid: true,
  },
  {
    id: 4,
    name: "401(k) - Current Employer",
    type: "Retirement",
    value: 85000,
    institution: "Vanguard",
    change: 2100,
    changePct: 2.5,
    liquid: false,
  },
  {
    id: 5,
    name: "Roth IRA",
    type: "Retirement",
    value: 45000,
    institution: "Fidelity",
    change: 1800,
    changePct: 4.2,
    liquid: false,
  },
  {
    id: 6,
    name: "Primary Residence",
    type: "Real Estate",
    value: 275000,
    institution: "Zillow Estimate",
    change: 5000,
    changePct: 1.9,
    liquid: false,
  },
  {
    id: 7,
    name: "Vehicle - 2022 Tesla Model 3",
    type: "Vehicle",
    value: 35000,
    institution: "KBB Estimate",
    change: -1200,
    changePct: -3.3,
    liquid: false,
  },
  {
    id: 8,
    name: "Emergency Fund CD",
    type: "Cash",
    value: 10000,
    institution: "Marcus by Goldman Sachs",
    change: 45,
    changePct: 0.5,
    liquid: true,
  },
];

export default function AssetsList() {
  const totalAssets = assets.reduce((sum, a) => sum + a.value, 0);

  return (
    <div className="rounded-2xl bg-white shadow-sm">
      <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Assets</h3>
        <span className="text-sm font-medium text-emerald-600">
          Total: ${totalAssets.toLocaleString()}
        </span>
      </div>
      <div className="divide-y">
        {assets.map((asset) => (
          <AssetRow key={asset.id} asset={asset} />
        ))}
      </div>
    </div>
  );
}