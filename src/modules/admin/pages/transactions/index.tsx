import { CustomDropDown } from "@/common/components/custom-dropdown";
import CustomInput from "@/common/components/forms/input";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { useEffect, useMemo } from "react";
import { getTransactionsGroupThunk } from "@/common/store/reducers/transactions-group/thunk";
import { TransactionsTable } from "@/common/components/tables/transactions-table";
import { currencyFormatter } from "@/common/helpers/currency-formatter";
import { paths } from "@/common/routes";
import { useAppSelector } from "@/common/hooks/useAppSelector";
import { columns } from "@/common/helpers/tables/transaction";
import { useNavigate } from "react-router-dom";

export default function Transactions() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data, loading } = useAppSelector((state) => state.transaction_group);

  const tableData = useMemo(
    () =>
      data.map((item, idx) => ({
        reseller: <p>{item.seller_name}</p>,
        total_on_ramp: (
          <div className="flex items-center gap-x-4">
            <p>{currencyFormatter(Number(item.total_on_ramp), "USD")}</p>
            <button
              className="text-xs px-4 py-1 text-[#000000] bg-[#C5C5C5] font-medium rounded-lg"
              onClick={() =>
                navigate(
                  paths.dashboard.admin.resellers_transactions.replace(
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
            <p>{currencyFormatter(Number(item.total_off_ramp), "USD")}</p>
            <button
              className="text-xs px-4 py-1 text-[#000000] bg-[#C5C5C5] font-medium rounded-lg"
              onClick={() =>
                navigate(
                  paths.dashboard.admin.resellers_transactions.replace(
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
        commission: <p>{currencyFormatter(Number(item.commission), "USD")}</p>,
        users: (
          <p className="bg-[#E3F5D3] px-5 font-semibold py-2 text-xs rounded-lg text-[#000000] text-center">
            {item.users}
          </p>
        ),
        pending_txns: (
          <button className="bg-[#FABD86]  font-semibold py-2 px-3 text-xs rounded-lg text-[#000000] text-center">
            {item.pending_txn}
          </button>
        ),
      })),
    [navigate, data]
  );

  useEffect(() => {
    dispatch(getTransactionsGroupThunk({ type: "admin" }));
  }, [dispatch]);

  return (
    <div className="">
      <div className="mb-8 flex flex-col md:flex-row gap-y-6 md:gap-y-0  md:items-center justify-between">
        <div className="flex items-center gap-x-10 justify-between md:justify-start">
          <h1 className="text-secondary text-2xl md:text-3xl font-bold capitalize">
            Transactions Group
          </h1>
          <CustomDropDown
            title="Country"
            options={[
              { title: "Nigeria" },
              { title: "Ghana" },
              { title: "Kenya" },
            ]}
          />
        </div>
        <div className="items-center gap-x-8 flex justify-between md:justify-start">
          <div className="flex-1 md:flex-grow-0">
            <CustomInput
              showError={false}
              placeholder="Search"
              className="md:min-w-[20rem] text-sm"
            />
          </div>
          <CustomDropDown
            title="Sort"
            options={[{ title: "Completed" }, { title: "Pending" }]}
          />
        </div>
      </div>
      <TransactionsTable columns={columns} data={tableData} loading={loading} />
    </div>
  );
}
