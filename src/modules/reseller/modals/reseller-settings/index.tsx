import { CustomToggle } from "@/common/components/custom-toggle";
import { BaseModal } from "@/common/components/modal";
import Dropzone from "@/common/components/custom-dragdrop";
import CustomColorInput from "@/common/components/forms/color-input";
import CustomButton from "@/common/components/forms/button";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { getResellerSettingsThunk } from "@/common/store/reducers/resellers/thunk";
import { ResellerSettingsDataType } from "@/common/types";
import { MoonLoader } from "react-spinners";
import { SectionComponent } from "@/common/components/section-component";
import { PriceConfiguration } from "@/common/components/price-configuration";
import { DomainConfiguration } from "@/common/components/domain-configuration";

export default function ResellerSettings() {
  const navigate = useNavigate();
  //TODO: Replace with the actual reseller ID
  const id = "1";
  const dispatch = useAppDispatch();
  const [resellerSetting, setResellerSetting] =
    useState<ResellerSettingsDataType | null>(null);
  const [loading, setLoading] = useState(false);

  const handleClose = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        setLoading(true);
        const response = await dispatch(
          getResellerSettingsThunk({ user_reference: id })
        ).unwrap();
        setResellerSetting(response);
      } catch (error) {
        handleClose();
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch, id, handleClose]);

  return (
    <BaseModal handleClose={handleClose}>
      <div className="">
        {!resellerSetting || loading ? (
          <div className="h-[20rem] flex justify-center items-center flex-col animate-pulse gap-y-2">
            <MoonLoader size={30} />
            <p>Loading...</p>
          </div>
        ) : null}
        {resellerSetting ? (
          <div className="flex flex-col md:flex-row gap-y-8 md:gap-y-0 justify-between">
            <div className="md:flex-[0.3]">
              <div className=" flex justify-between items-center mb-10">
                <h1 className="font-bold text-xl md:text-2xl text-[#3B3838]">
                  Reseller Settings
                </h1>
              </div>
              <div className="mb-6">
                <h4 className="text-lg text-[#3B3838] font-semibold">
                  Reseller&apos;s info
                </h4>
              </div>

              <div className="flex flex-col gap-y-5">
                <div className="grid grid-cols-2 md:grid-cols-1 gap-y-3">
                  <SectionComponent
                    title="Full name"
                    children={resellerSetting.full_name}
                  />
                  <SectionComponent
                    title="Email"
                    children={resellerSetting.email}
                  />
                  <SectionComponent
                    title="Phone"
                    children={resellerSetting.phone}
                  />
                  <SectionComponent
                    title="Custom domain"
                    children="www.onxwapy.com"
                  />
                </div>
                <div className="grid grid-cols-2 gap-x-4">
                  <div className="bg-gray-100 rounded-md"></div>
                  <div className="">
                    <Dropzone
                      name="reseller_logo"
                      accept={{
                        "application/pdf": [".pdf"],
                      }}
                      className="w-full"
                      showText={false}
                    />
                  </div>
                </div>
                <div className="">
                  <form>
                    <div className="grid grid-cols-2 gap-1 mb-2">
                      <CustomColorInput
                        labelClassName="text-xs text-[#5C5C60] "
                        className="text-sm placeholder:text-sm h-[1.75rem]"
                        label="Primary Color"
                        defaultValue={resellerSetting.primary_color}
                        containerClassName="flex-col gap-y-1 !items-start"
                      />
                      <CustomColorInput
                        labelClassName="text-xs text-[#5C5C60]"
                        className="text-sm placeholder:text-sm h-[1.75rem] "
                        label="Secondary Color"
                        defaultValue={resellerSetting.secondary_color}
                        containerClassName="flex-col gap-y-1 !items-start"
                      />
                      <CustomColorInput
                        labelClassName="text-xs text-[#5C5C60]"
                        className="text-sm placeholder:text-sm h-[1.75rem] "
                        label="Text Color"
                        defaultValue={resellerSetting.text_color}
                        containerClassName="flex-col gap-y-1 !items-start"
                      />
                    </div>
                    <CustomButton className="w-fit rounded-xl py-2 px-6 text-sm">
                      Save
                    </CustomButton>
                  </form>
                </div>
              </div>
            </div>
            <div className="md:flex-[0.65] flex gap-y-10 flex-col">
              <div className="flex items-center gap-x-6">
                <CustomToggle label="Reseller Status" />
                <button className="bg-[#FEEEDF] text-xs px-4 py-2 text-[#000000] font-semibold rounded-xl min-w-20 capitalize">
                  In-Active
                </button>
              </div>
              <DomainConfiguration />
              <PriceConfiguration />
            </div>
          </div>
        ) : null}
      </div>
    </BaseModal>
  );
}
