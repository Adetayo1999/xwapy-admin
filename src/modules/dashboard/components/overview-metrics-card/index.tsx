import { currencyFormatter } from "@/common/helpers/currency-formatter";
import NumberFormatter from "@/common/helpers/number-formatter";

interface OverviewMetricsCardProps {
  title: string;
  metric: number;
  currency?: string;
  count?: number;
}

export const OverviewMetricsCard: React.FC<OverviewMetricsCardProps> = ({
  metric,
  title,
  count,
  currency,
}) => {
  return (
    <div className="bg-[#F2F1EB] rounded-2xl min-w-[13.313rem] h-[8.813rem] p-8 flex flex-col">
      <h4 className="text-[#000000] text-sm font-medium mb-2">{title}</h4>
      <h1 className="font-bold text-secondary text-3xl mb-2">
        {currency
          ? currencyFormatter(metric, currency)
          : NumberFormatter(metric)}
      </h1>
      {count ? (
        <p className="text-[#8E8A8A] text-xs font-medium">
          {NumberFormatter(count)}
        </p>
      ) : null}
    </div>
  );
};
