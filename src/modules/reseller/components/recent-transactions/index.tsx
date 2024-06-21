import { AnimatedTabs } from "@/common/components/animated-tabs";
import { RecentTransactionTable } from "@/common/components/tables/recent-transactions-table";
import { currencyFormatter } from "@/common/helpers/currency-formatter";
import { column } from "@/common/helpers/tables/recent-transactions";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { useAppSelector } from "@/common/hooks/useAppSelector";
import { useModalNavigate } from "@/common/hooks/useModalNavigate";
import { paths } from "@/common/routes";
import { getTransactionsThunk } from "@/common/store/reducers/transactions/thunks";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export const RecentTransaction = () => {
  const navigate = useModalNavigate();
  const dispatch = useAppDispatch();
  const [urlParams] = useSearchParams();
  const { data, loading } = useAppSelector((state) => state.transactions);

  const transactionType =
    (urlParams.get("type")?.replace("-", "_") as "on_ramp" | "off_ramp") ||
    "on_ramp";

  const tableData = useMemo(
    () =>
      data.map((item, idx) => ({
        reseller: <p>{item.reseller_name}</p>,
        reference: <p>{item.reference}</p>,
        amount: <p>{currencyFormatter(item.amount, "USD")}</p>,
        fee: <p>{currencyFormatter(item.fee, "USD")}</p>,
        fiat_sum: <p>{currencyFormatter(item.fiat_sum, item.currency)}</p>,
        txn_details: (
          <button
            className="bg-primary rounded-xl px-4 py-2 text-xs text-[#000000] font-medium"
            onClick={() =>
              navigate(
                paths.dashboard.resellers.modals.transaction_details.replace(
                  ":id",
                  (idx + 1).toString()
                )
              )
            }
          >
            View
          </button>
        ),
        date: <p>{item.date}</p>,
      })),
    [navigate, data]
  );

  useEffect(() => {
    dispatch(
      getTransactionsThunk({
        filter: "recent",
        type: "reseller",
        trade_type: transactionType,
      })
    );
  }, [dispatch, transactionType]);

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
              path: paths.dashboard.admin.overview + "?type=on-ramp",
            },
            {
              id: 2,
              title: "off-ramp",
              path: paths.dashboard.admin.overview + "?type=off-ramp",
            },
          ]}
        />
      </div>
      <RecentTransactionTable
        column={column}
        data={tableData}
        loading={loading}
      />
    </div>
  );
};
