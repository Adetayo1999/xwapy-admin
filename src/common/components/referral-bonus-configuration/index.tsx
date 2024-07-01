import { SubmitHandler, useForm } from "react-hook-form";
import CustomButton from "../forms/button";
import CustomInput from "../forms/input";
import { useAppSelector } from "@/common/hooks/useAppSelector";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { saveResellerSettingsThunk } from "@/common/store/reducers/resellers/thunk";
import { getUserThunk } from "@/common/store/reducers/userdata/thunk";

interface ReferralBonusConfigurationProps {
  type: "reseller" | "admin";
}

interface ReferralBonusConfigurationType {
  referral_commission_percent: string;
}

export const ReferralBonusConfiguration: React.FC<
  ReferralBonusConfigurationProps
> = ({ type }) => {
  const dispatch = useAppDispatch();
  const { data: userData, loading } = useAppSelector((state) => state.userdata);
  const {
    formState: { isSubmitting },
    register,
    handleSubmit,
  } = useForm<ReferralBonusConfigurationType>();

  const handleReferralBonusConfigurationSubmit: SubmitHandler<
    ReferralBonusConfigurationType
  > = async (data) => {
    try {
      await dispatch(
        saveResellerSettingsThunk({
          ...data,
          type,
          domain_name: userData?.custom_domain,
          fuspay_intrapay_merchant_id: userData?.intrapay_merchant_id,
          off_ramp_fee_percent: userData?.off_ramp_fee,
          on_ramp_fee_percent: userData?.on_ramp_fee,
        })
      ).unwrap();
      dispatch(getUserThunk({ type }));
      toast.success("Reseller details saved successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className="flex items-end gap-x-6"
      onSubmit={handleSubmit(handleReferralBonusConfigurationSubmit)}
    >
      <CustomInput
        label="Referral Bonus (%)"
        placeholder="e.g 1.5%"
        {...register("referral_commission_percent", { required: true })}
        showError={false}
      />
      <CustomButton
        className="h-fit w-fit rounded-xl py-2 px-8 text-sm"
        isloading={isSubmitting || loading}
      >
        Save
      </CustomButton>
    </form>
  );
};
