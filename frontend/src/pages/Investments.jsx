import InvestmentsHeader from "../components/investments/InvestmentsHeader";
import InvestmentsStats from "../components/investments/InvestmentsStats";
import InvestmentsTable from "../components/investments/InvestmentsTable";

export default function Investments() {
  return (
    <div className="space-y-6">
      <InvestmentsHeader />

      <InvestmentsStats />

      <InvestmentsTable />
    </div>
  );
}