import { CustomDropDown } from "@/common/components/custom-dropdown";
import { UsersTable } from "../../components/tables/users-table";
import CustomInput from "@/common/components/forms/input";

export default function Users() {
  return (
    <div className="">
      <div className="mb-8 flex  gap-x-10 items-center">
        <h1 className="text-secondary text-3xl font-bold capitalize">Users</h1>
        <CustomDropDown
          title="Country"
          options={[
            { title: "Nigeria" },
            { title: "Ghana" },
            { title: "Kenya" },
          ]}
        />
        <CustomInput
          showError={false}
          placeholder="Search"
          className="min-w-[20rem]"
        />
      </div>
      <UsersTable />
    </div>
  );
}
