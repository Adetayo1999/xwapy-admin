import { OverviewMetrics } from "@/common/components/overview-metrics";
import { RecentTransaction } from "../../components/recent-transactions";
import { getMetricsThunk } from "@/common/store/reducers/metrics-slice/thunk";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { useAppSelector } from "@/common/hooks/useAppSelector";
import { useEffect, useMemo } from "react";

export default function OverView() {
  const { loading, metrics } = useAppSelector((state) => state.metrics);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMetricsThunk({ type: "reseller" }));
  }, [dispatch]);

  const METRICS_LIST = useMemo(
    () => [
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

  return (
    <div className="flex flex-col gap-y-12">
      <OverviewMetrics metrics={METRICS_LIST} loading={loading} />
      <RecentTransaction />
    </div>
  );
}
