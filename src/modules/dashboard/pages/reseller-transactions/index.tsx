import { paths } from "@/common/routes";
import { AnimatedTabs } from "../../components/animated-tabs";
import { useParams } from "react-router-dom";
import { TransactionGroupTable } from "../../components/tables/transaction-group-table";
import { CustomDropDown } from "@/common/components/custom-dropdown";
import CustomInput from "@/common/components/forms/input";

export default function ResellerTransactions() {
  const { id } = useParams();

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
        <div className="flex items-center gap-x-10">
          <AnimatedTabs
            tabs={[
              {
                id: 1,
                title: "on-ramp",
                path:
                  paths.dashboard.resellers_transactions.replace(":id", id!) +
                  "?type=on-ramp",
              },
              {
                id: 2,
                title: "off-ramp",
                path:
                  paths.dashboard.resellers_transactions.replace(":id", id!) +
                  "?type=off-ramp",
              },
            ]}
          />
          <CustomDropDown
            title="Sort"
            options={[{ title: "Completed" }, { title: "Pending" }]}
          />
          <CustomInput
            showError={false}
            placeholder="Search"
            className="min-w-[20rem] "
          />
        </div>
      </div>
      <TransactionGroupTable />
    </div>
  );
}
