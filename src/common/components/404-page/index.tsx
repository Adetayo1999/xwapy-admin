import authDesign from "@/assets/images/auth-design.png";
import appLogoLight from "@/assets/images/xwapy-logo-light.png";
import errorImage from "@/assets/images/error_404.png";
import { Link } from "react-router-dom";
import clsx from "clsx";

export default function Error404() {
  return (
    <div className="min-h-[100vh] bg-[#000000] relative py-[2rem] md:pb-[4rem]">
      <div className="w-[90%] md:w-[80%] mx-auto h-full">
        <div className="z-20 mb-[6rem]">
          <Link to="/">
            <img src={appLogoLight} className="w-24 md:w-fit" alt="Xwapy" />
          </Link>
        </div>
        <div className="flex flex-col md:items-center md:flex-row gap-y-10 md:gap-y-0 justify-between  h-full z-30 relative">
          <div className="px-[2rem] md:px-0 md:w-[50%] flex flex-col gap-y-4 md:gap-y-6 md:mb-6">
            <h1 className="text-3xl md:text-6xl text-white font-bold  capitalize">
              What are you <br className="hidden md:inline" /> doing here?
            </h1>
            <p className="text-gray-300 text-lg md:text-xl">
              You have ventured too far into the{" "}
              <br className="hidden md:inline" /> dessert. Its time to head home
            </p>
            <Link
              to="/"
              className={clsx(
                "flex cursor-pointer items-center justify-center gap-x-1  rounded-lg py-3 px-12 font-semibold disabled:cursor-not-allowed disabled:bg-slate-200",
                "bg-primary text-[#000000] md:max-w-xs"
              )}
            >
              Go Home
            </Link>
          </div>
          <div className="w-full md:w-[45%]">
            <img
              src={errorImage}
              alt="Error"
              className="w-full md:w-fit md:object-contain "
            />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 z-10 w-full md:h-[20rem]">
          <img src={authDesign} className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}
