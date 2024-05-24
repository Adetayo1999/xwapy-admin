import { OverviewMetricsCard } from "./overview-metrics-card";

export interface OverviewMetricsCardProps {
  id: number;
  title: string;
  metric: number;
  currency?: string;
  count?: number;
}

interface OverviewMetricsProps {
  metrics: OverviewMetricsCardProps[];
  loading: boolean;
}

export const OverviewMetrics: React.FC<OverviewMetricsProps> = ({
  loading,
  metrics,
}) => {
  const renderMetricsCard = () => (
    <div className="flex flex-col md:flex-row flex-wrap gap-4">
      {metrics.map((item) => (
        <OverviewMetricsCard {...item} key={item.id} />
      ))}
    </div>
  );

  const renderLoadingMetrics = () => {
    return (
      <div className="flex flex-col md:flex-row flex-wrap gap-4">
        {[...new Array(9).keys()].map((item) => (
          <div
            className="bg-[#F2F1EB] rounded-2xl w-full md:w-fit md:min-w-[13.313rem] h-[8.813rem] p-8 flex flex-col animate-pulse"
            key={item}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="">
      <div className="mb-5">
        <h1 className="text-secondary text-2xl md:text-3xl font-bold">
          Overview
        </h1>
      </div>
      {loading || !metrics ? renderLoadingMetrics() : renderMetricsCard()}
    </div>
  );
};
