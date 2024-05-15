import { Table } from "@/common/components/custom-table";
import { currencyFormatter } from "@/common/helpers/currency-formatter";
import { columns, data } from "@/common/helpers/tables/transaction";
import { useModalNavigate } from "@/common/hooks/useModalNavigate";
import { paths } from "@/common/routes";
import { useMemo } from "react";

export const TransactionGroupTable = () => {
  const navigate = useModalNavigate();

  const tableData = useMemo(
    () =>
      data.map((item, idx) => ({
        reseller: <p>{item.reseller}</p>,
        total_on_ramp: (
          <div className="flex items-center gap-x-4">
            <p>{currencyFormatter(item.total_on_ramp, item.currency)}</p>
            <button
              className="text-xs px-4 py-1 text-[#000000] bg-[#C5C5C5] font-medium rounded-lg"
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
          </div>
        ),
        total_off_ramp: (
          <div className="flex items-center gap-x-4">
            <p>{currencyFormatter(item.total_off_ramp, item.currency)}</p>
            <button
              className="text-xs px-4 py-1 text-[#000000] bg-[#C5C5C5] font-medium rounded-lg"
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
          </div>
        ),
        commission: <p>{currencyFormatter(item.commission, item.currency)}</p>,
        users: (
          <p className="bg-[#E3F5D3] px-5 font-semibold py-2 text-xs rounded-lg text-[#000000] text-center">
            {item.users}
          </p>
        ),
        pending_txns: (
          <button className="bg-[#FABD86]  font-semibold py-2 px-3 text-xs rounded-lg text-[#000000] text-center">
            {item.pending_txns}
          </button>
        ),
      })),
    [navigate]
  );

  return (
    <div className="">
      <Table columns={columns} data={tableData} />
    </div>
  );
};
