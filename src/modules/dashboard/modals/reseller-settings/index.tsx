import { CustomToggle } from "@/common/components/custom-toggle";
import { BaseModal } from "@/common/components/modal";
import { SectionComponent } from "../../components/section-component";
import Dropzone from "@/common/components/custom-dragdrop";
import CustomColorInput from "@/common/components/forms/color-input";
import CustomButton from "@/common/components/forms/button";
import { DomainConfiguration } from "../../components/domain-configuration";
import { PriceConfiguration } from "../../components/price-configuration";
import { useNavigate } from "react-router-dom";

export default function ResellerSettings() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <BaseModal handleClose={handleClose}>
      <div className="">
        <div className="flex justify-between">
          <div className="flex-[0.3]">
            <div className=" flex justify-between items-center mb-10">
              <h1 className="font-bold text-2xl text-[#3B3838] ">
                Reseller Settings
              </h1>
            </div>
            <div className="mb-6">
              <h4 className="text-lg text-[#3B3838] font-semibold">
                Reseller&apos;s info
              </h4>
            </div>

            <div className="flex flex-col gap-y-5">
              <div className="flex flex-col gap-y-3">
                <SectionComponent title="Full name" children="Charles Avis" />
                <SectionComponent
                  title="Email"
                  children="talktoavischarles@gmail.com"
                />
                <SectionComponent title="Phone" children="08101018131" />
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
                      className="text-sm placeholder:text-sm h-[1.75rem]  "
                      label="Primary Color"
                      defaultValue="#6F7290"
                      containerClassName="flex-col gap-y-1 !items-start"
                    />
                    <CustomColorInput
                      labelClassName="text-xs text-[#5C5C60]"
                      className="text-sm placeholder:text-sm h-[1.75rem] "
                      label="Secondary Color"
                      defaultValue="#6F7290"
                      containerClassName="flex-col gap-y-1 !items-start"
                    />
                    <CustomColorInput
                      labelClassName="text-xs text-[#5C5C60]"
                      className="text-sm placeholder:text-sm h-[1.75rem] "
                      label="Text Color"
                      defaultValue="#6F7290"
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
          <div className="flex-[0.65] flex gap-y-10 flex-col">
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
      </div>
    </BaseModal>
  );
}
