import { CustomToggle } from "@/common/components/custom-toggle";
import { BaseModal } from "@/common/components/modal";
import Dropzone from "@/common/components/custom-dragdrop";
import CustomColorInput from "@/common/components/forms/color-input";
import CustomButton from "@/common/components/forms/button";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { MoonLoader } from "react-spinners";
import { SectionComponent } from "@/common/components/section-component";
import { PriceConfiguration } from "@/common/components/price-configuration";
import { DomainConfiguration } from "@/common/components/domain-configuration";
import { useAppSelector } from "@/common/hooks/useAppSelector";
import { getUserThunk } from "@/common/store/reducers/userdata/thunk";
import { SubmitHandler, useForm } from "react-hook-form";
import { FileRejection } from "react-dropzone";
import { toastError } from "@/common/helpers/error";
import { requests } from "@/common/services/requests";

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
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<BrandingFormType>();
  const { data, is_fetched, loading } = useAppSelector(
    (state) => state.userdata
  );
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
    if (!is_fetched) {
      dispatch(getUserThunk());
    }
  }, [dispatch, is_fetched]);

  const handleSaveUserBranding: SubmitHandler<BrandingFormType> = async (
    values
  ) => {
    if (!data) return;

    try {
      const requestData = JSON.stringify({
        ...values,
        ...images,
      });

      await requests.addDataToStore({
        meta_data: requestData,
        key_value: "Description of the app branding",
        key_name: `${data.sub_domain}_branding`,
      });
    } catch (error: any) {
      toastError(error.message || "Something went wrong...");
    }
  };

  const toBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === "string") resolve(reader.result);
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
        {!data || loading ? (
          <div className="h-[20rem] flex justify-center items-center flex-col animate-pulse gap-y-2">
            <MoonLoader size={30} />
            <p>Loading...</p>
          </div>
        ) : null}
        {data ? (
          <div className="flex flex-col md:flex-row gap-y-8 md:gap-y-0 justify-between items-start">
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

              <div className="flex flex-col gap-y-8">
                <div className="grid grid-cols-2 md:grid-cols-1 gap-y-3">
                  <SectionComponent
                    title="Full name"
                    children={`${data.first_name} ${data.last_name}`}
                  />
                  <SectionComponent title="Email" children={data.email} />
                  <SectionComponent title="Phone" children={"NIL"} />
                  <SectionComponent
                    title="Custom domain"
                    children={`www.onxwapy.com`}
                  />
                  <SectionComponent
                    title="Mapped Sub-domain"
                    children={`${data.sub_domain}.onxwapy.com`}
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
                          <div className="bg-gray-100 rounded-md overflow-hidden">
                            {images.support_icon ? (
                              <img
                                src={images.support_icon}
                                alt=""
                                className="w-full h-full object-cover"
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
                          <div className="bg-gray-100 rounded-md overflow-hidden">
                            {images.favicon ? (
                              <img
                                src={images.favicon}
                                alt=""
                                className="w-full h-full object-cover"
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
                          <div className="bg-gray-100 rounded-md overflow-hidden">
                            {images.app_logo ? (
                              <img
                                src={images.app_logo}
                                alt=""
                                className="w-full h-full object-cover"
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
                          <div className="bg-gray-100 rounded-md overflow-hidden">
                            {images.splash_screen ? (
                              <img
                                src={images.splash_screen}
                                alt=""
                                className="w-full h-full object-cover"
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
            <div className="md:flex-[0.65] flex gap-y-10 flex-col ">
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
