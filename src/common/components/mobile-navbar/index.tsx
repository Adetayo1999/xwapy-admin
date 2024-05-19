import { Link, NavLink } from "react-router-dom";
import appLogoDark from "@/assets/images/xwapy-logo-dark.png";
import { paths } from "@/common/routes";

interface MobileNavbarProps {
  isActive: boolean;
  handleClose: VoidFunction;
}

export const MobileNavbar: React.FC<MobileNavbarProps> = ({
  isActive,
  handleClose,
}) => {
  const DASHBOARD_NAV = [
    {
      id: 1,
      name: "Overview",
      path: paths.dashboard.overview,
    },
    {
      id: 2,
      name: "Sellers",
      path: paths.dashboard.resellers,
    },
    {
      id: 3,
      name: "Transactions",
      path: paths.dashboard.transactions,
    },
    {
      id: 4,
      name: "Users",
      path: paths.dashboard.users,
    },
  ];

  return (
    <div
      className={`fixed md:hidden top-0 left-0 w-full h-screen z-50 bg-black bg-opacity-40 ${
        isActive
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } transition duration-500`}
      onClick={handleClose}
    >
      <nav
        className={`w-[60%] transition delay-100 duration-500 bg-slate-50 h-full py-6 px-6  ${
          isActive ? "translate-x-0" : "-translate-x-[100%]"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <Link to="/" className="flex items-center mb-10" onClick={handleClose}>
          <img src={appLogoDark} alt="Xwapy logo" className="w-28 " />
        </Link>
        <ul className="flex flex-col gap-y-8">
          {DASHBOARD_NAV.map(({ id, name, path }) => (
            <li
              className="w-full flex items-center transition duration-200 "
              key={id}
            >
              <NavLink
                to={path}
                onClick={handleClose}
                className={({ isActive }) =>
                  `${
                    isActive ? "text-[#000000]" : "text-[#656363]"
                  } font-semibold text-base`
                }
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
