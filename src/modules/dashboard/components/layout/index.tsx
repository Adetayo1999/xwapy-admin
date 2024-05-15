import { Link, Outlet } from "react-router-dom";
import appLogoDark from "@/assets/images/xwapy-logo-dark.png";
import { DashboardNav } from "../dashboard-nav";
import CustomButton from "@/common/components/forms/button";

export const DashboardLayout = () => {
  return (
    <div className="h-screen overflow-hidden flex">
      <div className="bg-[#F2F1EB] flex-[0.15] py-8 px-12">
        <div className="mb-20">
          <Link to="/">
            <img src={appLogoDark} alt="" className="w-24" />
          </Link>
        </div>
        <DashboardNav />
      </div>
      <div className="overflow-y-auto flex-[0.85] flex-shrink-0 p-10 flex flex-col gap-y-12">
        <div className="flex justify-end">
          <CustomButton className="text-gray-50 bg-red-500 w-fit text-sm !py-2 !px-6 ">
            Logout
          </CustomButton>
        </div>
        <Outlet />
      </div>
    </div>
  );
};
