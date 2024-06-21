import { Link } from "react-router-dom";
import { DashboardNav } from "../dashboard-nav";
import clsx from "clsx";
import { DashboardNavType } from "@/common/types";

interface SidebarProps {
  variant: "light" | "dark";
  logo: string;
  navs: DashboardNavType[];
  settingClickHandler?: VoidFunction;
}

const VARIANT_STYLES = {
  light: "bg-[#F2F1EB]",
  dark: "bg-[#000000]",
};

export const Sidebar: React.FC<SidebarProps> = ({
  logo,
  navs,
  variant,
  settingClickHandler,
}) => {
  return (
    <div
      className={clsx(
        "flex-[0.15] py-8 px-12 hidden md:block relative",
        VARIANT_STYLES[variant]
      )}
    >
      <div className="mb-20">
        <Link to="/">
          <img src={logo} alt="" className="w-24" />
        </Link>
      </div>
      <DashboardNav navs={navs} variant={variant} />

      {settingClickHandler ? (
        <div className="mt-5">
          <button className="text-[#605F5F]" onClick={settingClickHandler}>
            Settings
          </button>
        </div>
      ) : null}
    </div>
  );
};
