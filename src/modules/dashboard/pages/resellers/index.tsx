import CustomButton from "@/common/components/forms/button";
import { ResellerTable } from "../../components/tables/reseller-table";
import { useModalNavigate } from "@/common/hooks/useModalNavigate";
import { paths } from "@/common/routes";

export default function Resellers() {
  const navigate = useModalNavigate();
  return (
    <div className="">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-secondary text-3xl font-bold capitalize">
          Xwapy resellers
        </h1>
        <CustomButton
          className="bg-primary text-[#000000] px-10 w-fit text-sm py-2 !rounded-2xl"
          onClick={() => navigate(paths.dashboard.modals.create_reseller)}
        >
          Create Reseller
        </CustomButton>
      </div>
      <ResellerTable />
    </div>
  );
}
