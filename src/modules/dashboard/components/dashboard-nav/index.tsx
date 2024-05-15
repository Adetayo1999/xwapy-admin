import { paths } from "@/common/routes";
import { NavLink } from "react-router-dom";

export const DashboardNav = () => {
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
    <nav>
      <ul className="flex flex-col gap-y-5">
        {DASHBOARD_NAV.map((n) => (
          <li key={n.id}>
            <NavLink
              className={({ isActive }) =>
                `${
                  isActive ? "text-[#000000]" : "text-[#656363]"
                } font-semibold text-[0.938rem]`
              }
              to={n.path}
            >
              {n.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
