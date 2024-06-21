import Dropzone from "@/common/components/custom-dragdrop";
import CustomButton from "@/common/components/forms/button";
import CustomColorInput from "@/common/components/forms/color-input";
import CustomInput from "@/common/components/forms/input";
import CustomTextarea from "@/common/components/forms/textarea";
import { BaseModal } from "@/common/components/modal";
import { toastError } from "@/common/helpers/error";
import { renderInputLabel } from "@/common/helpers/label-text";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { requests } from "@/common/services/requests";
import { CreateResellerRequestType } from "@/common/services/types";
import { createResellerThunk } from "@/common/store/reducers/resellers/thunk";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function CreateSeller() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
    setValue,
    watch,
  } = useForm<CreateResellerRequestType>();

  const handleClose = () => {
    navigate(-1);
  };

  const { logo } = watch();

  const getBase64StringFromDataURL = (dataURL: string) =>
    dataURL.replace("data:", "").replace(/^.+,/, "");

  const toBase64 = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const handleFileDrop = async (files: File[]) => {
    try {
      const base64_data = getBase64StringFromDataURL(
        (await toBase64(files[0])) as string
      );
      const response = await requests.uploadFile({
        base64_data,
        file_name: files[0].name,
      });
      setValue("logo", response.data.url);
    } catch (error) {
      toastError(error);
    }
  };

  const onSubmit: SubmitHandler<CreateResellerRequestType> = async (data) => {
    try {
      await dispatch(createResellerThunk({ ...data, type: "admin" })).unwrap();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BaseModal handleClose={handleClose}>
      <div className="">
        <div className="mb-10">
          <h1 className="font-bold text-xl md:text-2xl text-[#3B3838] ">
            Create a Reseller
          </h1>
        </div>
        <div>
          <form
            className="flex flex-col gap-y-5"
            onSubmit={handleSubmit(onSubmit)}
          >
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
                    {...register("fname", { required: true })}
                    error={errors.fname}
                  />
                  <CustomInput
                    label="Password"
                    labelClassName="text-xs"
                    className="text-xs placeholder:text-xs"
                    placeholder="Enter Password"
                    {...register("password", { required: true })}
                    error={errors.password}
                    type="password"
                  />

                  <CustomInput
                    label="Enter Email"
                    labelClassName="text-xs"
                    className="text-sm placeholder:text-sm"
                    placeholder="example@gmail.com"
                    {...register("email", { required: true })}
                    error={errors.email}
                  />
                  <CustomTextarea
                    label="Description"
                    labelClassName="text-xs"
                    className="text-sm placeholder:text-sm"
                    placeholder="About"
                    {...register("description", { required: true })}
                    error={errors.description}
                  />
                  <CustomInput
                    label="Sub-Domain"
                    labelClassName="text-xs"
                    className="text-sm placeholder:text-sm"
                    placeholder="username.xwapy.com"
                    {...register("sub_domain", { required: true })}
                    error={errors.sub_domain}
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
                    <div className="grid grid-cols-2 gap-x-5">
                      <Dropzone
                        name="app_logo"
                        accept={{
                          "image/png": [".png"],
                          "image/jpg": [".jpg"],
                        }}
                        className="w-full h-full"
                        onDrop={handleFileDrop}
                      />
                      <div className="rounded-md bg-[#F6F6F6] max-h-[10rem] overflow-hidden">
                        {logo && (
                          <img
                            src={logo}
                            alt="Reseller Logo"
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <CustomColorInput
                    labelClassName="text-xs text-[#5C5C60]  min-w-[6rem]"
                    className="text-sm placeholder:text-sm h-[1.75rem]"
                    label="Primary Color"
                    defaultValue="#6F7290"
                    {...register("primary_color", { required: true })}
                    error={errors.primary_color}
                  />
                  <CustomColorInput
                    labelClassName="text-xs text-[#5C5C60] min-w-[6rem]"
                    className="text-sm placeholder:text-sm h-[1.75rem] "
                    label="Secondary Color"
                    defaultValue="#6F7290"
                    {...register("secondary_color", { required: true })}
                    error={errors.secondary_color}
                  />
                  <CustomColorInput
                    labelClassName="text-xs text-[#5C5C60] min-w-[6rem]"
                    className="text-sm placeholder:text-sm h-[1.75rem] "
                    label="Text Color"
                    defaultValue="#6F7290"
                    {...register("text_color", { required: true })}
                    error={errors.text_color}
                  />
                  <CustomInput
                    labelClassName="text-xs"
                    placeholder="e.g me@you.com"
                    className="text-sm placeholder:text-sm"
                    label="Domain name"
                    {...register("domain_name", { required: true })}
                    error={errors.domain_name}
                  />
                  <CustomInput
                    labelClassName="text-xs"
                    placeholder="e.g telegram"
                    className="text-sm placeholder:text-sm"
                    label="Support Channel URL"
                    {...register("support_channel_url", { required: true })}
                    error={errors.support_channel_url}
                  />
                </div>
              </div>
            </div>
            <div className="">
              <CustomButton
                className="text-sm"
                isloading={isSubmitting}
                disabled={!logo}
              >
                Create Seller
              </CustomButton>
            </div>
          </form>
        </div>
      </div>
    </BaseModal>
  );
}
