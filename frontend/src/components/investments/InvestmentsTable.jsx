import InvestmentRow from "./InvestmentRow";

const holdings = [
  {
    id: 1,
    symbol: "AAPL",
    name: "Apple Inc.",
    shares: 50,
    avgCost: 150.00,
    currentPrice: 189.50,
    value: 9475.00,
    gainLoss: 1975.00,
    gainLossPct: 26.3,
    type: "Stock",
    sector: "Technology",
  },
  {
    id: 2,
    symbol: "MSFT",
    name: "Microsoft Corp.",
    shares: 30,
    avgCost: 280.00,
    currentPrice: 415.25,
    value: 12457.50,
    gainLoss: 4057.50,
    gainLossPct: 48.3,
    type: "Stock",
    sector: "Technology",
  },
  {
    id: 3,
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    shares: 20,
    avgCost: 120.00,
    currentPrice: 142.80,
    value: 2856.00,
    gainLoss: 456.00,
    gainLossPct: 19.0,
    type: "Stock",
    sector: "Technology",
  },
  {
    id: 4,
    symbol: "VTI",
    name: "Vanguard Total Stock Market ETF",
    shares: 100,
    avgCost: 200.00,
    currentPrice: 245.60,
    value: 24560.00,
    gainLoss: 4560.00,
    gainLossPct: 22.8,
    type: "ETF",
    sector: "Diversified",
  },
  {
    id: 5,
    symbol: "VXUS",
    name: "Vanguard Total International Stock ETF",
    shares: 80,
    avgCost: 55.00,
    currentPrice: 58.90,
    value: 4712.00,
    gainLoss: 312.00,
    gainLossPct: 7.1,
    type: "ETF",
    sector: "International",
  },
  {
    id: 6,
    symbol: "BND",
    name: "Vanguard Total Bond Market ETF",
    shares: 150,
    avgCost: 82.00,
    currentPrice: 78.50,
    value: 11775.00,
    gainLoss: -525.00,
    gainLossPct: -4.3,
    type: "Bond",
    sector: "Fixed Income",
  },
  {
    id: 7,
    symbol: "SCHD",
    name: "Schwab US Dividend Equity ETF",
    shares: 60,
    avgCost: 70.00,
    currentPrice: 76.20,
    value: 4572.00,
    gainLoss: 372.00,
    gainLossPct: 8.9,
    type: "ETF",
    sector: "Dividend",
  },
  {
    id: 8,
    symbol: "JNJ",
    name: "Johnson & Johnson",
    shares: 25,
    avgCost: 160.00,
    currentPrice: 155.80,
    value: 3895.00,
    gainLoss: -105.00,
    gainLossPct: -2.6,
    type: "Stock",
    sector: "Healthcare",
  },
];

export default function InvestmentsTable() {
  return (
    <div className="rounded-2xl bg-white shadow-sm">
      {/* Horizontal scroll on small screens */}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[1000px] border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left">Asset</th>
              <th className="px-6 py-4 text-left">Type</th>
              <th className="px-6 py-4 text-right">Shares</th>
              <th className="px-6 py-4 text-right">Avg Cost</th>
              <th className="px-6 py-4 text-right">Current Price</th>
              <th className="px-6 py-4 text-right">Value</th>
              <th className="px-6 py-4 text-right">Gain/Loss</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((holding) => (
              <InvestmentRow key={holding.id} holding={holding} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}