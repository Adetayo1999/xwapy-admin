import CustomButton from "@/common/components/forms/button";
import { ResellerTable } from "../../components/tables/reseller-table";
import { useModalNavigate } from "@/common/hooks/useModalNavigate";
import { paths } from "@/common/routes";
import CustomInput from "@/common/components/forms/input";

export default function Resellers() {
  const navigate = useModalNavigate();
  return (
    <div className="">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-secondary text-3xl font-bold capitalize">
          Xwapy resellers
        </h1>
        <div className="items-center gap-x-8 flex">
          <CustomInput
            showError={false}
            placeholder="Search"
            className="min-w-[20rem]"
          />
          <CustomButton
            className="bg-primary text-[#000000] px-10 w-fit text-sm py-2 !rounded-2xl"
            onClick={() => navigate(paths.dashboard.modals.create_reseller)}
          >
            Create Reseller
          </CustomButton>
        </div>
      </div>
      <ResellerTable />
    </div>
  );
}
