import { CustomDropDown } from "@/common/components/custom-dropdown";
import { UsersTable } from "../../components/tables/users-table";
import CustomInput from "@/common/components/forms/input";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { useEffect } from "react";
import { getUsersThunk } from "@/common/store/reducers/users/thunk";

export default function Users() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsersThunk({}));
  }, [dispatch]);

  return (
    <div className="">
      <div className="mb-8 flex gap-y-6 md:gap-y-0 flex-col md:flex-row  gap-x-10 md:items-center">
        <h1 className="text-secondary text-2xl md:text-3xl font-bold capitalize">
          Users
        </h1>
        <div className="flex items-center gap-x-6 md:gap-x-10">
          <CustomDropDown
            title="Country"
            options={[
              { title: "Nigeria" },
              { title: "Ghana" },
              { title: "Kenya" },
            ]}
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
      <UsersTable />
    </div>
  );
}
