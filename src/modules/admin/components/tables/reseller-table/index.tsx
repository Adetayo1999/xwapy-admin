import { Table } from "@/common/components/custom-table";
import { columns } from "@/common/helpers/tables/reseller";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { useAppSelector } from "@/common/hooks/useAppSelector";
import { useModalNavigate } from "@/common/hooks/useModalNavigate";
import { paths } from "@/common/routes";
import { getResellersThunk } from "@/common/store/reducers/resellers/thunk";
import { useEffect, useMemo } from "react";

export const ResellerTable = () => {
  const navigate = useModalNavigate();
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector((state) => state.resellers);

  const tableData = useMemo(
    () =>
      data.map((item) => ({
        ...item,
        name: item.name || "NIL",
        date: item.date || "NIL",
        domain: item.domain || "NIL",
        email: item.email || "NIL",
        phone: item.phone || "NIL",

        settings: (
          <button
            className="bg-primary rounded-xl px-4 py-2 text-xs text-[#000000] font-medium"
            onClick={() =>
              navigate(
                paths.dashboard.admin.modals.reseller_settings.replace(
                  ":id",
                  item.seller_id
                )
              )
            }
          >
            Settings
          </button>
        ),
      })),
    [navigate, data]
  );

  useEffect(() => {
    dispatch(getResellersThunk({ type: "admin" }));
  }, [dispatch]);

  return (
    <div className="">
      <Table columns={columns} data={tableData} loading={loading} />
    </div>
  );
};
