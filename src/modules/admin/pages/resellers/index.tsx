import CustomButton from "@/common/components/forms/button";
import { useModalNavigate } from "@/common/hooks/useModalNavigate";
import { paths } from "@/common/routes";
import CustomInput from "@/common/components/forms/input";
import { ResellerTable } from "../../components/tables/reseller-table";

export default function Resellers() {
  const navigate = useModalNavigate();
  return (
    <div className="">
      <div className="mb-8 flex flex-col md:flex-row gap-y-8 md:gap-y-0  md:justify-between md:items-center">
        <h1 className="text-secondary text-2xl md:text-3xl font-bold capitalize">
          Xwapy resellers
        </h1>
        <div className="items-center gap-x-6 md:gap-x-8 flex">
          <div className="flex-1 md:flex-grow-0">
            <CustomInput
              showError={false}
              placeholder="Search"
              className="md:min-w-[20rem] text-sm"
            />
          </div>
          <CustomButton
            className="bg-primary text-[#000000] px-6 md:px-10 w-fit text-sm py-2 !rounded-2xl"
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
