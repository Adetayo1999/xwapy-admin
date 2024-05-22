import { useEffect, useMemo } from "react";
import { OverviewMetricsCard } from "../overview-metrics-card";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { getMetricsThunk } from "@/common/store/reducers/metrics-slice/thunk";
import { useAppSelector } from "@/common/hooks/useAppSelector";

export const OverviewMetrics = () => {
  const { loading, metrics } = useAppSelector((state) => state.metrics);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMetricsThunk());
  }, [dispatch]);

  const METRICS_LIST = useMemo(
    () => [
      {
        id: 1,
        title: "Resellers",
        metric: metrics?.total_resellers || 0,
      },
      {
        id: 2,
        title: "Users",
        metric: metrics?.users || 0,
      },
      {
        id: 3,
        title: "On-ramp",
        metric: metrics?.on_ramp || 0,
        currency: "USD",
        count: 0,
      },
      {
        id: 4,
        title: "Off Ramp",
        metric: metrics?.off_ramp || 0,
        currency: "USD",
        count: 0,
      },
      {
        id: 5,
        title: "On-ramp (pending)",
        metric: metrics?.on_ramp_pending || 0,
      },
      {
        id: 6,
        title: "Off-ramp (pending)",
        metric: metrics?.off_ramp_pending || 0,
      },
    ],
    [metrics]
  );

  const renderMetricsCard = () => (
    <div className="flex flex-col md:flex-row flex-wrap gap-4">
      {METRICS_LIST.map((item) => (
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
