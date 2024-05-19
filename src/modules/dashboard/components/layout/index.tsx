import { Link, Outlet, useNavigate } from "react-router-dom";
import appLogoDark from "@/assets/images/xwapy-logo-dark.png";

import { DashboardNav } from "../dashboard-nav";
import CustomButton from "@/common/components/forms/button";
import { paths } from "@/common/routes";
import { useState } from "react";
import { MobileNavbar } from "@/common/components/mobile-navbar";

export const DashboardLayout = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsActive((prev) => !prev);
  };

  const handleClose = () => {
    setIsActive(false);
  };

  return (
    <>
      <div className="md:h-screen md:overflow-hidden md:flex">
        <div className="bg-[#F2F1EB] flex-[0.15] py-8 px-12 hidden md:block">
          <div className="mb-20">
            <Link to="/">
              <img src={appLogoDark} alt="" className="w-24" />
            </Link>
          </div>
          <DashboardNav />
        </div>
        <div className="md:overflow-y-auto md:flex-[0.85] md:flex-shrink-0 p-10 flex flex-col gap-y-12">
          <div className="flex justify-between md:justify-end">
            <Link to="/" className="md:hidden">
              <img src={appLogoDark} alt="" className="w-24" />
            </Link>
            <div className="flex items-center gap-x-6">
              <CustomButton
                className="text-gray-50 bg-red-500 w-fit text-sm !py-2 !px-6 "
                onClick={() => navigate(paths.auth.login)}
              >
                Logout
              </CustomButton>
              <button
                className={`inline-flex md:hidden flex-col ${
                  isActive && "z-[100]"
                }`}
                onClick={handleToggle}
              >
                <span
                  className={`w-[2rem] h-[.25rem]  duration-[.3s] ease-in-out  rounded-[12rem] ${
                    isActive
                      ? "translate-y-[.4rem] rotate-45 bg-gray-50"
                      : "bg-gray-800"
                  }`}
                />
                <span
                  className={`w-[1rem] h-[.25rem] ml-4  rounded-[12rem] ${
                    isActive
                      ? "opacity-0 my-0 bg-gray-50"
                      : "opacity-100 my-[.3rem] bg-gray-800"
                  }`}
                />
                <span
                  className={`w-[2rem] h-[.25rem]  duration-[.3s] ease-in-out rounded-[12rem] ${
                    isActive
                      ? "-translate-y-[.11rem] -rotate-45 bg-gray-50"
                      : "bg-gray-800"
                  }`}
                />
              </button>
              <MobileNavbar isActive={isActive} handleClose={handleClose} />
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
};
