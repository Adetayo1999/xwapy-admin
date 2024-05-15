import { paths } from "@/common/routes";
import { AnimatedTabs } from "../animated-tabs";
import { RecentTransactionTable } from "../tables/recent-transactions-table";

export const RecentTransaction = () => {
  return (
    <div className="">
      <div className="mb-5">
        <h1 className="text-secondary text-2xl font-bold mb-4">
          Recent transactions
        </h1>
        <AnimatedTabs
          tabs={[
            {
              id: 1,
              title: "on-ramp",
              path: paths.dashboard.overview + "?type=on-ramp",
            },
            {
              id: 2,
              title: "off-ramp",
              path: paths.dashboard.overview + "?type=off-ramp",
            },
          ]}
        />
      </div>
      <RecentTransactionTable />
    </div>
  );
};
