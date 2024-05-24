import { DashboardNavType } from "@/common/types";
import clsx from "clsx";
import { NavLink } from "react-router-dom";

const VARIANT_STYLES = {
  light: (isActive: boolean) =>
    `${isActive ? "text-[#000000]" : "text-[#656363]"}`,
  dark: (isActive: boolean) =>
    `${isActive ? "text-[#FFFFFF]" : "text-[#605F5F]"}`,
};

export const DashboardNav: React.FC<{
  navs: DashboardNavType[];
  variant: "light" | "dark";
}> = ({ navs, variant }) => {
  return (
    <nav>
      <ul className="flex flex-col gap-y-5">
        {navs.map((n) => (
          <li key={n.id}>
            <NavLink
              className={({ isActive }) =>
                clsx(
                  "font-semibold text-[0.938rem]",
                  variant === "light"
                    ? VARIANT_STYLES.light(isActive)
                    : VARIANT_STYLES.dark(isActive)
                )
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
