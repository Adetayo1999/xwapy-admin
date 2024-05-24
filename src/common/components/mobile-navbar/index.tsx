import { useModalNavigate } from "@/common/hooks/useModalNavigate";
import { paths } from "@/common/routes";
import { Link, NavLink } from "react-router-dom";

interface MobileNavbarProps {
  isActive: boolean;
  handleClose: VoidFunction;
  navs: { id: number; name: string; path: string }[];
  logo: string;
  hasSettings?: boolean;
}

export const MobileNavbar: React.FC<MobileNavbarProps> = ({
  isActive,
  handleClose,
  navs,
  logo,
  hasSettings,
}) => {
  const navigate = useModalNavigate();

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
          <img src={logo} alt="Xwapy logo" className="w-28 " />
        </Link>
        <ul className="flex flex-col gap-y-8">
          {navs.map(({ id, name, path }) => (
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
          {hasSettings ? (
            <li className="w-full flex items-center transition duration-200 ">
              <button
                className="font-semibold text-base text-[#656363]"
                onClick={() => {
                  navigate(paths.dashboard.resellers.modals.reseller_settings);
                  handleClose();
                }}
              >
                Settings
              </button>
            </li>
          ) : null}
        </ul>
      </nav>
    </div>
  );
};
