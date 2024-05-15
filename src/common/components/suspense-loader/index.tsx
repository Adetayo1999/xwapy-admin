import { MoonLoader } from "react-spinners";

export const SuspenseLoader = () => {
  return (
    <div className="h-[90vh] flex justify-center items-center">
      <div className="">
        <MoonLoader size={50} color="#F1D643" />
        <p className="text-[#000000] text-center animate-pulse text-sm mt-2">
          Loading Xwapy...
        </p>
      </div>
    </div>
  );
};
