import { paths } from "@/common/routes";
import { useParams } from "react-router-dom";
import { CustomDropDown } from "@/common/components/custom-dropdown";
import CustomInput from "@/common/components/forms/input";
import { AnimatedTabs } from "@/common/components/animated-tabs";
import { TransactionsTable } from "@/common/components/tables/transactions-table";
import { getTransactionsGroupThunk } from "@/common/store/reducers/transactions-group/thunk";
import { useEffect, useMemo } from "react";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { useModalNavigate } from "@/common/hooks/useModalNavigate";
import { useAppSelector } from "@/common/hooks/useAppSelector";
import { currencyFormatter } from "@/common/helpers/currency-formatter";
import { columns } from "@/common/helpers/tables/transaction";

export default function ResellerTransactions() {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const navigate = useModalNavigate();

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
                  paths.dashboard.admin.modals.transaction_details.replace(
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
                  paths.dashboard.admin.modals.transaction_details.replace(
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
    dispatch(getTransactionsGroupThunk({}));
  }, [dispatch]);

  return (
    <div className="">
      <div className="mb-8 flex flex-col gap-y-6">
        <h1 className="text-secondary text-3xl font-bold capitalize">
          Transactions
        </h1>
        <div className="flex gap-x-12">
          <div className="flex flex-col gap-y-1">
            <p className="text-sm text-[#B7B2B2]">Reseller</p>
            <h2 className="font-semibold text-[#605F5F] text-sm">
              Charles Avis
            </h2>
          </div>
          <div className="flex flex-col gap-y-1">
            <p className="text-sm text-[#B7B2B2]">Settlement</p>
            <h2 className="font-semibold text-[#605F5F] text-sm">
              intra_merchant_123344322
            </h2>
          </div>
        </div>
        <div className="flex md:items-center gap-x-10 flex-col md:flex-row gap-y-6 md:gap-y-0">
          <AnimatedTabs
            tabs={[
              {
                id: 1,
                title: "on-ramp",
                path:
                  paths.dashboard.admin.resellers_transactions.replace(
                    ":id",
                    id!
                  ) + "?type=on-ramp",
              },
              {
                id: 2,
                title: "off-ramp",
                path:
                  paths.dashboard.admin.resellers_transactions.replace(
                    ":id",
                    id!
                  ) + "?type=off-ramp",
              },
            ]}
          />
          <div className="justify-between md:justify-start flex flex-row-reverse md:flex-row gap-x-6 md:gap-x-10">
            <CustomDropDown
              title="Sort"
              options={[{ title: "Completed" }, { title: "Pending" }]}
            />
            <div className="flex-1 md:flex-grow-0">
              <CustomInput
                showError={false}
                placeholder="Search"
                className="min-w-[20rem] text-sm"
              />
            </div>
          </div>
        </div>
      </div>
      <TransactionsTable data={tableData} columns={columns} loading={loading} />
    </div>
  );
}
