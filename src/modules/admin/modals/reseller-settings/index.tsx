import { BaseModal } from "@/common/components/modal";
import Dropzone from "@/common/components/custom-dragdrop";
import CustomColorInput from "@/common/components/forms/color-input";
import CustomButton from "@/common/components/forms/button";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { getResellerSettingsThunk } from "@/common/store/reducers/resellers/thunk";
import { ResellerSettingsDataType } from "@/common/types";
import { MoonLoader } from "react-spinners";
import { SectionComponent } from "@/common/components/section-component";
import { PriceConfiguration } from "@/common/components/price-configuration";
import { DomainConfiguration } from "@/common/components/domain-configuration";
import { SubmitHandler, useForm } from "react-hook-form";
import { requests } from "@/common/services/requests";
import { toastError } from "@/common/helpers/error";
import { FileRejection } from "react-dropzone";
import toast from "react-hot-toast";

interface BrandingFormType {
  text_color: string;
  background_color: string;
  button_bg_color: string;
  button_text_color: string;
  box_bg_color_1: string;
  box_bg_color_2: string;
  header_color: string;
  header_active_color: string;
}

type BrandingImageTypes =
  | "favicon"
  | "support_icon"
  | "app_logo"
  | "splash_screen";

export default function ResellerSettings() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [resellerSetting, setResellerSetting] =
    useState<ResellerSettingsDataType | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<BrandingFormType>();

  const [images, setImages] = useState<{
    [key in BrandingImageTypes]: string;
  }>({
    app_logo: "",
    favicon: "",
    splash_screen: "",
    support_icon: "",
  });

  const [loadingImages, setLoadingImages] = useState<{
    [key in BrandingImageTypes]: boolean;
  }>({
    app_logo: false,
    favicon: false,
    splash_screen: false,
    support_icon: false,
  });

  const handleClose = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        setLoading(true);
        const response = await dispatch(
          getResellerSettingsThunk({ user_reference: id, type: "admin" })
        ).unwrap();
        setResellerSetting(response);
      } catch (error) {
        handleClose();
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch, id, handleClose]);

  const handleSaveUserBranding: SubmitHandler<BrandingFormType> = async (
    values
  ) => {
    if (!resellerSetting) return;

    try {
      const requestData = JSON.stringify({
        ...values,
        ...images,
      });

      await requests.addDataToStore({
        meta_data: requestData,
        key_value: "Description of the app branding",
        key_name: `${resellerSetting.custom_domain}_branding`,
        type: "admin",
      });

      toast.success("Reseller settings saved");
    } catch (error: any) {
      toastError(error.message || "Something went wrong...");
    }
  };

  const getBase64StringFromDataURL = (dataURL: string) =>
    dataURL.replace("data:", "").replace(/^.+,/, "");

  const toBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === "string")
          resolve(getBase64StringFromDataURL(reader.result));
      };
      reader.onerror = reject;
    });

  const onImageDrop = async (
    files: File[],
    rejectedFiles: FileRejection[],
    file_key: BrandingImageTypes
  ) => {
    rejectedFiles.forEach((rejectedFile) => {
      const { file, errors } = rejectedFile;
      errors.forEach((error) => {
        if (error.code === "file-invalid-type") {
          toastError(`File format not accepted: ${file.type}`);
        } else if (error.code === "file-too-large") {
          toastError(`File is too large: ${(file.size / 1024).toFixed(2)} KB`);
        }
      });
    });

    if (files.length > 0) {
      try {
        setLoadingImages((prev) => ({ ...prev, [file_key]: true }));
        const base64_data = await toBase64(files[0]);
        const response = await requests.uploadFile({
          base64_data,
          file_name: files[0].name,
        });

        setImages((prev) => ({ ...prev, [file_key]: response.data.url }));
      } catch (error: any) {
        toastError(error?.message || "Something went wrong");
      } finally {
        setLoadingImages((prev) => ({ ...prev, [file_key]: false }));
      }
    }
  };

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
                    children={resellerSetting.custom_domain}
                  />
                  <SectionComponent
                    title="Mapped Sub-domain"
                    children={resellerSetting.custom_domain}
                  />
                </div>
                <div className="">
                  <div className="mb-5">
                    <h4 className="text-lg text-[#3B3838] font-semibold">
                      Branding configuration
                    </h4>
                  </div>
                  <form
                    onSubmit={handleSubmit(handleSaveUserBranding)}
                    className="flex flex-col gap-y-3"
                  >
                    <div className="grid grid-cols-2 gap-1 mb-2">
                      <CustomColorInput
                        labelClassName="text-xs text-[#5C5C60] "
                        className="text-sm placeholder:text-sm h-[1.75rem]"
                        label="Text Color"
                        {...register("text_color", { required: true })}
                        containerClassName="flex-col gap-y-1 !items-start"
                      />
                      <CustomColorInput
                        labelClassName="text-xs text-[#5C5C60]"
                        className="text-sm placeholder:text-sm h-[1.75rem] "
                        label="Background Color"
                        {...register("background_color", { required: true })}
                        containerClassName="flex-col gap-y-1 !items-start"
                      />
                      <CustomColorInput
                        labelClassName="text-xs text-[#5C5C60]"
                        className="text-sm placeholder:text-sm h-[1.75rem] "
                        label="Button Color 1"
                        {...register("button_bg_color", { required: true })}
                        containerClassName="flex-col gap-y-1 !items-start"
                      />
                      <CustomColorInput
                        labelClassName="text-xs text-[#5C5C60] "
                        className="text-sm placeholder:text-sm h-[1.75rem]"
                        label="Button Text Color"
                        {...register("button_text_color", { required: true })}
                        containerClassName="flex-col gap-y-1 !items-start"
                      />
                      <CustomColorInput
                        labelClassName="text-xs text-[#5C5C60]"
                        className="text-sm placeholder:text-sm h-[1.75rem] "
                        label="Box BG Color 1"
                        {...register("box_bg_color_1", { required: true })}
                        containerClassName="flex-col gap-y-1 !items-start"
                      />
                      <CustomColorInput
                        labelClassName="text-xs text-[#5C5C60]"
                        className="text-sm placeholder:text-sm h-[1.75rem] "
                        label="Box BG Color 2"
                        {...register("box_bg_color_2", { required: true })}
                        containerClassName="flex-col gap-y-1 !items-start"
                      />
                      <CustomColorInput
                        labelClassName="text-xs text-[#5C5C60] "
                        className="text-sm placeholder:text-sm h-[1.75rem]"
                        label="Header Color"
                        {...register("header_color", { required: true })}
                        containerClassName="flex-col gap-y-1 !items-start"
                      />
                      <CustomColorInput
                        labelClassName="text-xs text-[#5C5C60]"
                        className="text-sm placeholder:text-sm h-[1.75rem] "
                        label="Header Active Color"
                        {...register("header_active_color", { required: true })}
                        containerClassName="flex-col gap-y-1 !items-start"
                      />
                    </div>
                    <div className="mb-3 flex flex-col gap-y-4">
                      <div className="flex flex-col gap-y-1">
                        <h5 className="text-sm font-semibold text-[#000000]">
                          Suport Icon
                        </h5>
                        <div className="grid grid-cols-2 gap-x-4">
                          <div className="bg-gray-100 flex justify-center items-center rounded-md overflow-hidden h-[6.8rem] w-full">
                            {images.support_icon ? (
                              <img
                                src={images.support_icon}
                                alt=""
                                className=" h-full w-full object-contain"
                              />
                            ) : null}
                          </div>
                          <div className="">
                            <Dropzone
                              name="support_icon"
                              accept={{
                                "image/png": [".png"],
                                "image/jpeg": [".jpeg"],
                                "image/jpg": [".jpg"],
                              }}
                              onDrop={(files, rejectedFiles) =>
                                onImageDrop(
                                  files,
                                  rejectedFiles,
                                  "support_icon"
                                )
                              }
                              className="w-full"
                              showText={false}
                            />
                          </div>
                        </div>
                        <p className="text-xs text-[#B7B2B2]">
                          Dimension: 2 x 1
                        </p>
                      </div>
                      <div className="flex flex-col gap-y-1">
                        <h5 className="text-sm font-semibold text-[#000000]">
                          Favicon
                        </h5>
                        <div className="grid grid-cols-2 gap-x-4">
                          <div className="bg-gray-100 flex justify-center items-center rounded-md overflow-hidden h-[6.8rem] w-full">
                            {images.favicon ? (
                              <img
                                src={images.favicon}
                                alt=""
                                className="w-full h-full object-contain"
                              />
                            ) : null}
                          </div>
                          <div className="">
                            <Dropzone
                              name="favicon"
                              accept={{
                                "image/ico": [".ico"],
                                "image/jpeg": [".jpeg"],
                                "image/jpg": [".jpg"],
                              }}
                              onDrop={(files, rejectedFiles) =>
                                onImageDrop(files, rejectedFiles, "favicon")
                              }
                              className="w-full"
                              showText={false}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-y-1">
                        <h5 className="text-sm font-semibold text-[#000000]">
                          App Logo
                        </h5>
                        <div className="grid grid-cols-2 gap-x-4">
                          <div className="bg-gray-100 flex justify-center items-center rounded-md overflow-hidden h-[6.8rem] w-full">
                            {images.app_logo ? (
                              <img
                                src={images.app_logo}
                                alt=""
                                className="w-full h-full object-contain"
                              />
                            ) : null}
                          </div>
                          <div className="">
                            <Dropzone
                              name="app_logo"
                              accept={{
                                "image/png": [".png"],
                                "image/jpeg": [".jpeg"],
                                "image/jpg": [".jpg"],
                              }}
                              onDrop={(files, rejectedFiles) =>
                                onImageDrop(files, rejectedFiles, "app_logo")
                              }
                              className="w-full"
                              showText={false}
                            />
                          </div>
                        </div>
                        <p className="text-xs text-[#B7B2B2]">
                          Dimension: 2 x 1
                        </p>
                      </div>
                      <div className="flex flex-col gap-y-1">
                        <h5 className="text-sm font-semibold text-[#000000]">
                          Splash Screen
                        </h5>
                        <div className="grid grid-cols-2 gap-x-4">
                          <div className="bg-gray-100 flex justify-center items-center rounded-md overflow-hidden h-[6.8rem] w-full">
                            {images.splash_screen ? (
                              <img
                                src={images.splash_screen}
                                alt=""
                                className="w-full h-full object-contain"
                              />
                            ) : null}
                          </div>
                          <div className="">
                            <Dropzone
                              name="splash_screen"
                              accept={{
                                "image/png": [".png"],
                                "image/jpeg": [".jpeg"],
                                "image/jpg": [".jpg"],
                              }}
                              onDrop={(files, rejectedFiles) =>
                                onImageDrop(
                                  files,
                                  rejectedFiles,
                                  "splash_screen"
                                )
                              }
                              className="w-full"
                              showText={false}
                            />
                          </div>
                        </div>
                        <p className="text-xs text-[#B7B2B2]">
                          Dimension: 2 x 1
                        </p>
                      </div>
                    </div>

                    {Object.values(loadingImages).some(
                      (image) => image === true
                    ) ? (
                      <p className="text-xs text-[#F40B0B]  italic font-medium">
                        Uploading images...
                      </p>
                    ) : null}

                    <CustomButton
                      className="w-fit rounded-xl py-2 px-6 text-sm"
                      disabled={
                        isSubmitting ||
                        Object.values(images).some((image) => image === "")
                      }
                      isloading={isSubmitting}
                    >
                      Save
                    </CustomButton>
                  </form>
                </div>
              </div>
            </div>
            <div className="md:flex-[0.65] flex gap-y-10 flex-col">
              {/* <div className="flex items-center gap-x-6">
                <CustomToggle label="Reseller Status" />
                <button className="bg-[#FEEEDF] text-xs px-4 py-2 text-[#000000] font-semibold rounded-xl min-w-20 capitalize">
                  In-Active
                </button>
              </div> */}
              <DomainConfiguration type="admin" />
              <PriceConfiguration type="admin" />
            </div>
          </div>
        ) : null}
      </div>
    </BaseModal>
  );
}

// TODO:
/**
 * 1. sub domain missing on get reseller settings
 * 2. domain config missing on  get reseller settings
 * 3. price configuration data and intrapay mid missing on get   reseller settings endpoint
 *
 */
