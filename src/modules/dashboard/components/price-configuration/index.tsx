import CustomButton from "@/common/components/forms/button";
import CustomInput from "@/common/components/forms/input";

export const PriceConfiguration = () => {
  return (
    <div className="">
      <div className="justify-between flex items-center mb-5">
        <h4 className="text-lg text-[#3B3838] font-semibold">
          Price configuration
        </h4>
      </div>
      <form>
        <div className="grid grid-cols-3 gap-y-3 gap-x-6 mb-4">
          <CustomInput
            labelClassName="text-xs"
            placeholder="e.g 1.5%"
            className="text-sm placeholder:text-sm"
            label="On-ramp Fee"
          />
          <CustomInput
            labelClassName="text-xs"
            placeholder="e.g 1.5%"
            className="text-sm placeholder:text-sm"
            label="Off-ramp  Fee"
          />
          <CustomInput
            labelClassName="text-xs"
            placeholder="MUID_823hdj"
            className="text-sm placeholder:text-sm"
            label="Intrapay MID"
          />
          <CustomInput
            labelClassName="text-xs"
            placeholder="e.g 1.5%"
            className="text-sm placeholder:text-sm"
            label="Xwapy onramp Fee"
          />
          <CustomInput
            labelClassName="text-xs"
            placeholder="e.g 1.5%"
            className="text-sm placeholder:text-sm"
            label="Xwapy offramp Fee"
          />
        </div>
        <CustomButton className="h-fit w-fit rounded-xl py-2 px-8 text-sm">
          Save
        </CustomButton>
      </form>
    </div>
  );
};
