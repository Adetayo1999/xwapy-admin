import { CustomDropDown } from "@/common/components/custom-dropdown";
import { TransactionGroupTable } from "../../components/tables/transaction-group-table";
import CustomInput from "@/common/components/forms/input";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { useEffect } from "react";
import { getTransactionsGroupThunk } from "@/common/store/reducers/transactions-group/thunk";

export default function Transactions() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTransactionsGroupThunk({}));
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
      <TransactionGroupTable />
    </div>
  );
}
