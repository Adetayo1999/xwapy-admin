import Dropzone from "@/common/components/custom-dragdrop";
import CustomColorInput from "@/common/components/forms/color-input";
import CustomInput from "@/common/components/forms/input";
import CustomTextarea from "@/common/components/forms/textarea";
import { BaseModal } from "@/common/components/modal";
import { renderInputLabel } from "@/common/helpers/label-text";
import { useNavigate } from "react-router-dom";

export default function CreateSeller() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <BaseModal handleClose={handleClose}>
      <div className="">
        <div className="mb-10">
          <h1 className="font-bold text-xl md:text-2xl text-[#3B3838] ">
            Create a Reseller
          </h1>
        </div>
        <form>
          <div className="flex  md:justify-between flex-col md:flex-row gap-y-8 md:gap-y-0 ">
            <div className="md:flex-[0.4]">
              <div className="mb-4">
                <h4 className="text-lg text-[#3B3838] font-semibold">
                  Bio Data
                </h4>
              </div>
              <div className="flex flex-col gap-y-3">
                <CustomInput
                  label="Full name"
                  labelClassName="text-xs"
                  placeholder="John Doe"
                  className="text-sm placeholder:text-sm"
                />
                <CustomInput
                  label="Phone"
                  labelClassName="text-xs"
                  className="text-xs placeholder:text-xs"
                  placeholder="+2347045274781"
                />

                <CustomInput
                  label="Enter Email"
                  labelClassName="text-xs"
                  className="text-sm placeholder:text-sm"
                  placeholder="example@gmail.com"
                />
                <CustomTextarea
                  label="Description"
                  labelClassName="text-xs"
                  className="text-sm placeholder:text-sm"
                  placeholder="About"
                />
                <CustomInput
                  label="Sub-Domain"
                  labelClassName="text-xs"
                  className="text-sm placeholder:text-sm"
                  placeholder="username.xwapy.com"
                />
              </div>
            </div>
            <div className="md:flex-[0.4]">
              <div className="mb-4">
                <h4 className="text-lg text-[#3B3838] font-semibold">
                  Branding
                </h4>
              </div>
              <div className="flex flex-col gap-y-3">
                <div className="flex flex-col gap-y-2  mb-5">
                  {renderInputLabel(false, "App Logo", "")}
                  <Dropzone
                    name="app_logo"
                    accept={{
                      "application/pdf": [".pdf"],
                    }}
                    className="w-fit"
                  />
                </div>
                <CustomColorInput
                  labelClassName="text-xs text-[#5C5C60]  min-w-[6rem]"
                  className="text-sm placeholder:text-sm h-[1.75rem]"
                  label="Primary Color"
                  defaultValue="#6F7290"
                />
                <CustomColorInput
                  labelClassName="text-xs text-[#5C5C60] min-w-[6rem]"
                  className="text-sm placeholder:text-sm h-[1.75rem] "
                  label="Secondary Color"
                  defaultValue="#6F7290"
                />
                <CustomColorInput
                  labelClassName="text-xs text-[#5C5C60] min-w-[6rem]"
                  className="text-sm placeholder:text-sm h-[1.75rem] "
                  label="Text Color"
                  defaultValue="#6F7290"
                />
                <CustomInput
                  labelClassName="text-xs"
                  placeholder="e.g me@you.com"
                  className="text-sm placeholder:text-sm"
                  label="Domain name"
                />
                <CustomInput
                  labelClassName="text-xs"
                  placeholder="e.g telegram"
                  className="text-sm placeholder:text-sm"
                  label="Support Channel URL"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </BaseModal>
  );
}
