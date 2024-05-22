import CustomButton from "@/common/components/forms/button";
import CustomInput from "@/common/components/forms/input";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { SaveSellerSettingsRequestBodyType } from "@/common/services/types";
import { saveResellerSettingsThunk } from "@/common/store/reducers/resellers/thunk";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const PriceConfiguration = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<SaveSellerSettingsRequestBodyType>();

  const onSubmit: SubmitHandler<SaveSellerSettingsRequestBodyType> = async (
    data
  ) => {
    try {
      await dispatch(saveResellerSettingsThunk({ ...data })).unwrap();
      toast.success("Reseller details saved successfully");
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <div className="justify-between flex items-center mb-5">
        <h4 className="text-lg text-[#3B3838] font-semibold">
          Price configuration
        </h4>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-6 mb-4">
          <CustomInput
            labelClassName="text-xs"
            placeholder="e.g 1.5%"
            className="text-sm placeholder:text-sm"
            label="On-ramp Fee"
            {...register("on_ramp_fee_percent", { required: true })}
            error={errors.on_ramp_fee_percent}
          />
          <CustomInput
            labelClassName="text-xs"
            placeholder="e.g 1.5%"
            className="text-sm placeholder:text-sm"
            label="Off-ramp Fee"
            {...register("off_ramp_fee_percent", { required: true })}
            error={errors.off_ramp_fee_percent}
          />
          <CustomInput
            labelClassName="text-xs"
            placeholder="MUID_823hdj"
            className="text-sm placeholder:text-sm"
            label="Intrapay MID"
            {...register("fuspay_intrapay_merchant_id", { required: true })}
            error={errors.fuspay_intrapay_merchant_id}
          />
          <CustomInput
            labelClassName="text-xs"
            placeholder="e.g 1.5%"
            className="text-sm placeholder:text-sm"
            label="Xwapy onramp Fee"
            {...register("xwap_on_ramp_fee_percent", { required: true })}
            error={errors.xwap_on_ramp_fee_percent}
          />
          <CustomInput
            labelClassName="text-xs"
            placeholder="e.g 1.5%"
            className="text-sm placeholder:text-sm"
            label="Xwapy offramp Fee"
            {...register("xwap_off_ramp_fee_percent", { required: true })}
            error={errors.xwap_off_ramp_fee_percent}
          />
        </div>
        <CustomButton
          className="h-fit w-fit rounded-xl py-2 px-8 text-sm"
          isloading={isSubmitting}
        >
          Save
        </CustomButton>
      </form>
    </div>
  );
};
