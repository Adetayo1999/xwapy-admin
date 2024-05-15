import { OverviewMetrics } from "../../components/overview-metrics";
import { RecentTransaction } from "../../components/recent-transactions";

export default function OverView() {
  return (
    <div className="flex flex-col gap-y-12">
      <OverviewMetrics />
      <RecentTransaction />
    </div>
  );
}
