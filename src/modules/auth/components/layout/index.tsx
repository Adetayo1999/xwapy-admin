import { Link, Outlet, useSearchParams } from "react-router-dom";
import authDesign from "@/assets/images/auth-design.png";
import appLogoLight from "@/assets/images/xwapy-logo-light.png";

export default function AuthLayout() {
  const [searchParams] = useSearchParams();

  const isResellerLogin = searchParams.get("type");

  return (
    <div className="min-h-[100vh] bg-[#000000] relative py-[2rem] overflow-hidden">
      <div className="w-[90%] md:w-[80%] mx-auto h-full">
        <div className="z-20 mb-[6rem]">
          <Link to="/">
            <img src={appLogoLight} className="w-24 md:w-fit" alt="Xwapy" />
          </Link>
        </div>
        <div className="flex flex-col md:flex-row gap-y-8 md:gap-y-0 justify-between  h-full z-30 relative">
          <div className="flex-shrink-0 px-[2rem] md:px-0">
            <h1 className="text-4xl md:text-6xl text-white font-bold mb-4 md:mb-7 capitalize">
              {isResellerLogin === "reseller"
                ? "Reseller Admin"
                : "xwapy admin"}
            </h1>
            <p className="text-white text-lg md:text-xl">
              <span className="text-primary">Swap</span> stable-coin to NGN,
              KES, & <br className="hidden md:inline" /> GHS in real-time
            </p>
          </div>
          <div className="flex-[0.7]">
            <Outlet />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 z-10 w-full">
          <img src={authDesign} className="w-full" />
        </div>
      </div>
    </div>
  );
}
