import { Table } from "@/common/components/custom-table";
import { currencyFormatter } from "@/common/helpers/currency-formatter";
import { columns, getKYCStyles } from "@/common/helpers/tables/users";
import { useAppSelector } from "@/common/hooks/useAppSelector";
import { useModalNavigate } from "@/common/hooks/useModalNavigate";
import { paths } from "@/common/routes";
import clsx from "clsx";
import { useMemo } from "react";

export const UsersTable = () => {
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
                paths.dashboard.modals.user_settings.replace(
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
            {item.kyc_status}
          </button>
        ),
      })),
    [navigate, data]
  );

  return (
    <div className="">
      <Table columns={columns} data={tableData} loading={loading} />
    </div>
  );
};
