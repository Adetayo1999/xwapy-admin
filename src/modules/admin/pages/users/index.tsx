import { CustomDropDown } from "@/common/components/custom-dropdown";
import CustomInput from "@/common/components/forms/input";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { useEffect, useMemo } from "react";
import { getUsersThunk } from "@/common/store/reducers/users/thunk";
import { UsersTable } from "@/common/components/tables/users-table";
import { useModalNavigate } from "@/common/hooks/useModalNavigate";
import { useAppSelector } from "@/common/hooks/useAppSelector";
import { currencyFormatter } from "@/common/helpers/currency-formatter";
import { paths } from "@/common/routes";
import { columns, getKYCStyles } from "@/common/helpers/tables/users";
import clsx from "clsx";

export default function Users() {
  const dispatch = useAppDispatch();

  const navigate = useModalNavigate();
  const { data, loading } = useAppSelector((state) => state.users);

  const tableData = useMemo(
    () =>
      data.map((item) => ({
        ...item,
        off_ramp: <p>{currencyFormatter(Number(item.off_ramp), "USD")}</p>,
        on_ramp: <p>{currencyFormatter(Number(item.on_ramp), "USD")}</p>,
        settings: (
          <button
            className="bg-primary rounded-xl px-4 py-2 text-xs text-[#000000] font-semibold"
            onClick={() =>
              navigate(
                paths.dashboard.admin.modals.user_settings.replace(
                  ":id",
                  item.user_reference
                )
              )
            }
          >
            Settings
          </button>
        ),
        kyc: (
          <button
            className={clsx(
              "text-xs px-4 py-2 text-[#000000] font-semibold rounded-xl min-w-20 capitalize",
              getKYCStyles(item.kyc_status)
            )}
          >
            {item.kyc_status?.replace("_", " ")}
          </button>
        ),
      })),
    [navigate, data]
  );

  useEffect(() => {
    dispatch(getUsersThunk({ type: "admin" }));
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
      <UsersTable columns={columns} data={tableData} loading={loading} />
    </div>
  );
}
