import { Table } from "@/common/components/custom-table";
import { columns, data } from "@/common/helpers/tables/reseller";
import { useModalNavigate } from "@/common/hooks/useModalNavigate";
import { paths } from "@/common/routes";
import { useMemo } from "react";

export const ResellerTable = () => {
  const navigate = useModalNavigate();

  const tableData = useMemo(
    () =>
      data.map((item, idx) => ({
        ...item,
        settings: (
          <button
            className="bg-primary rounded-xl px-4 py-2 text-xs text-[#000000] font-medium"
            onClick={() =>
              navigate(
                paths.dashboard.modals.reseller_settings.replace(
                  ":id",
                  (idx + 1).toString()
                )
              )
            }
          >
            Settings
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
