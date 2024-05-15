import { Table } from "@/common/components/custom-table";
import { currencyFormatter } from "@/common/helpers/currency-formatter";
import { column, data } from "@/common/helpers/tables/recent-transactions";
import { useModalNavigate } from "@/common/hooks/useModalNavigate";
import { paths } from "@/common/routes";
import { useMemo } from "react";

export const RecentTransactionTable = () => {
  const navigate = useModalNavigate();

  const tableData = useMemo(
    () =>
      data.map((item, idx) => ({
        reseller: <p>{item.reseller}</p>,
        reference: <p>{item.reference}</p>,
        amount: <p>{currencyFormatter(item.amount, item.currency)}</p>,
        fee: <p>{currencyFormatter(item.fee, item.currency)}</p>,
        fiat_sum: <p>{currencyFormatter(item.fiat_sum, item.fiat_currency)}</p>,
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
    [navigate]
  );

  return (
    <div className="">
      <Table columns={column} data={tableData} />
    </div>
  );
};
