import { Link, Navigate, Outlet } from "react-router-dom";
import appLogoDark from "@/assets/images/xwapy-logo-dark.png";
import CustomButton from "@/common/components/forms/button";
import { useEffect, useState } from "react";
import { clearUserDetails, fetchUserToken } from "@/common/services/storage";
import { paths } from "@/common/routes";
import { Sidebar } from "@/common/components/sidebar";
import { MobileNavbar } from "@/common/components/mobile-navbar";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { getUserThunk } from "@/common/store/reducers/userdata/thunk";

export const AdminLayout = () => {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useAppDispatch();

  const navs = [
    {
      id: 1,
      name: "Overview",
      path: paths.dashboard.admin.overview,
    },
    {
      id: 2,
      name: "Sellers",
      path: paths.dashboard.admin.resellers,
    },
    {
      id: 3,
      name: "Transactions",
      path: paths.dashboard.admin.transactions,
    },
    {
      id: 4,
      name: "Users",
      path: paths.dashboard.admin.users,
    },
  ];

  const handleToggle = () => {
    setIsActive((prev) => !prev);
  };

  const handleLogout = () => {
    clearUserDetails();
    window.location.reload();
  };

  useEffect(() => {
    if (!fetchUserToken()) return;
    dispatch(getUserThunk({ type: "admin" }));
  }, [dispatch]);

  if (!fetchUserToken()) {
    return <Navigate to={paths.auth.login} />;
  }

  return (
    <>
      <div className="md:h-screen md:overflow-hidden md:flex">
        <Sidebar variant="light" logo={appLogoDark} navs={navs} />
        <div className="md:overflow-y-auto md:flex-[0.85] md:flex-shrink-0 p-10 flex flex-col gap-y-12">
          <div className="flex justify-between md:justify-end">
            <Link to="/" className="md:hidden">
              <img src={appLogoDark} alt="" className="w-24" />
            </Link>
            <div className="flex items-center gap-x-6">
              <CustomButton
                className="text-gray-50 bg-red-500 w-fit text-sm !py-2 !px-6 "
                onClick={handleLogout}
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
            </div>
          </div>
          <Outlet />
        </div>

        <MobileNavbar
          isActive={isActive}
          handleClose={() => setIsActive(false)}
          navs={navs}
          logo={appLogoDark}
        />
      </div>
    </>
  );
};
