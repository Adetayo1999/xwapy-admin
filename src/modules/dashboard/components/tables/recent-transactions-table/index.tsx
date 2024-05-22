import { Table } from "@/common/components/custom-table";
import { currencyFormatter } from "@/common/helpers/currency-formatter";
import { column } from "@/common/helpers/tables/recent-transactions";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { useAppSelector } from "@/common/hooks/useAppSelector";
import { useModalNavigate } from "@/common/hooks/useModalNavigate";
import { paths } from "@/common/routes";
import { getTransactionsThunk } from "@/common/store/reducers/transactions/thunks";
import { useEffect, useMemo } from "react";

export const RecentTransactionTable = () => {
  const navigate = useModalNavigate();
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector((state) => state.transactions);

  const tableData = useMemo(
    () =>
      data.map((item, idx) => ({
        reseller: <p>{item.reseller_name}</p>,
        reference: <p>{item.reference}</p>,
        amount: <p>{currencyFormatter(item.amount, "USD")}</p>,
        fee: <p>{currencyFormatter(item.fee, "USD")}</p>,
        fiat_sum: <p>{currencyFormatter(item.fiat_sum, "USD")}</p>,
        txn_details: (
          <button
            className="bg-primary rounded-xl px-4 py-2 text-xs text-[#000000] font-medium"
            onClick={() =>
              navigate(
                paths.dashboard.modals.transaction_details.replace(
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
    dispatch(getTransactionsThunk({ filter: "recent" }));
  }, [dispatch]);

  return (
    <div className="">
      <Table columns={column} data={tableData} loading={loading} />
    </div>
  );
};
