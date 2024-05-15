import { CustomDropDown } from "@/common/components/custom-dropdown";
import { TransactionGroupTable } from "../../components/tables/transaction-group-table";

export default function Transactions() {
  return (
    <div className="">
      <div className="mb-8 flex  items-center justify-between">
        <div className="flex items-center gap-x-10">
          <h1 className="text-secondary text-3xl font-bold capitalize">
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
        <div className="">
          <CustomDropDown
            title="Sort"
            options={[{ title: "Completed" }, { title: "Pending" }]}
          />
        </div>
      </div>
      <TransactionGroupTable />
    </div>
  );
}
