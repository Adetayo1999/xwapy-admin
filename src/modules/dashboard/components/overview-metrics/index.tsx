import { OverviewMetricsCard } from "../overview-metrics-card";

export const OverviewMetrics = () => {
  const renderMetricsCard = () => (
    <div className="flex flex-wrap gap-4">
      {METRICS_LIST.map((item) => (
        <OverviewMetricsCard {...item} key={item.id} />
      ))}
    </div>
  );

  return (
    <div className="">
      <div className="mb-5">
        <h1 className="text-secondary text-3xl font-bold">Overview</h1>
      </div>
      {renderMetricsCard()}
    </div>
  );
};

const METRICS_LIST = [
  {
    id: 1,
    title: "Resellers",
    metric: 22,
  },
  {
    id: 2,
    title: "Users",
    metric: 2434098,
  },
  {
    id: 3,
    title: "On-ramp",
    metric: 52434098,
    currency: "USD",
    count: 100642,
  },
  {
    id: 4,
    title: "Off Ramp",
    metric: 52434098,
    currency: "USD",
    count: 11432,
  },
  {
    id: 5,
    title: "On-ramp (pending)",
    metric: 22,
  },
  {
    id: 6,
    title: "Off-ramp (pending)",
    metric: 24,
  },
];
