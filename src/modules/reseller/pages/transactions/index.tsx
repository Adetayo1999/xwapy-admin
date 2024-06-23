import { paths } from "@/common/routes";
import { useParams, useSearchParams } from "react-router-dom";
import { CustomDropDown } from "@/common/components/custom-dropdown";
import CustomInput from "@/common/components/forms/input";
import { AnimatedTabs } from "@/common/components/animated-tabs";
import { TransactionsTable } from "@/common/components/tables/transactions-table";
import { useEffect, useMemo, useState } from "react";
import { currencyFormatter } from "@/common/helpers/currency-formatter";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { useModalNavigate } from "@/common/hooks/useModalNavigate";
import { useAppSelector } from "@/common/hooks/useAppSelector";
import { column as columns } from "@/common/helpers/tables/recent-transactions";
import { getTransactionsThunk } from "@/common/store/reducers/transactions/thunks";

export default function ResellerTransactions() {
  const { id } = useParams();
  const [urlParams] = useSearchParams();
  const { data: userData } = useAppSelector((state) => state.userdata);
  const [sort, setSort] = useState("");

  const transactionType =
    (urlParams.get("type")?.replace("-", "_") as "on_ramp" | "off_ramp") ||
    "on_ramp";

  const dispatch = useAppDispatch();
  const navigate = useModalNavigate();

  const { data, loading } = useAppSelector((state) => state.transactions);

  const tableData = useMemo(
    () =>
      data.map((item) => ({
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
                  item.txn_id.toString()
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
        type: "reseller",
        trade_type: transactionType,
        sort_by: (sort?.toLowerCase() as any) || undefined,
      })
    );
  }, [dispatch, transactionType, sort]);

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
              {userData?.first_name} {userData?.last_name}
            </h2>
          </div>
          <div className="flex flex-col gap-y-1">
            <p className="text-sm text-[#B7B2B2]">Settlement</p>
            <h2 className="font-semibold text-[#605F5F] capitalize text-sm">
              {userData?.intrapay_merchant_id}
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
                  paths.dashboard.resellers.transactions.replace(":id", id!) +
                  "?type=on-ramp",
              },
              {
                id: 2,
                title: "off-ramp",
                path:
                  paths.dashboard.resellers.transactions.replace(":id", id!) +
                  "?type=off-ramp",
              },
            ]}
          />
          <div className="justify-between md:justify-start flex flex-row-reverse md:flex-row gap-x-6 md:gap-x-10">
            <CustomDropDown
              title={sort}
              defaultTitle="Sort"
              handleChange={(title) => setSort(title)}
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
      <TransactionsTable columns={columns} data={tableData} loading={loading} />
    </div>
  );
}
