import { Table } from "@/common/components/custom-table";
import { currencyFormatter } from "@/common/helpers/currency-formatter";
import { columns, data, getKYCStyles } from "@/common/helpers/tables/users";
import { useModalNavigate } from "@/common/hooks/useModalNavigate";
import { paths } from "@/common/routes";
import clsx from "clsx";
import { useMemo } from "react";

export const UsersTable = () => {
  const navigate = useModalNavigate();

  const tableData = useMemo(
    () =>
      data.map((item, idx) => ({
        ...item,
        off_ramp: <p>{currencyFormatter(item.off_ramp, item.currency)}</p>,
        on_ramp: <p>{currencyFormatter(item.on_ramp, item.currency)}</p>,
        settings: (
          <button
            className="bg-primary rounded-xl px-4 py-2 text-xs text-[#000000] font-semibold"
            onClick={() =>
              navigate(
                paths.dashboard.modals.user_settings.replace(
                  ":id",
                  (idx + 1).toString()
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
              getKYCStyles(item.kyc)
            )}
          >
            {item.kyc}
          </button>
        ),
      })),
    [navigate]
  );

  return (
    <div className="">
      <Table columns={columns} data={tableData} />
    </div>
  );
};
