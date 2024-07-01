import { SubmitHandler, useForm } from "react-hook-form";
import CustomColorInput from "../forms/color-input";
import CustomButton from "../forms/button";
import { FileRejection } from "react-dropzone";
import { toastError } from "@/common/helpers/error";
import { requests } from "@/common/services/requests";
import { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "@/common/hooks/useAppSelector";
import Dropzone from "../custom-dragdrop";
import { CustomToggle } from "../custom-toggle";
import { getKYCStyles } from "@/common/helpers/tables/users";
import clsx from "clsx";
import toast from "react-hot-toast";
import { generateRandomString } from "@/common/helpers/generate-random-string";

type BRANDING_THEME_OPTIONS =
  | "metallic"
  | "nature"
  | "flowery"
  | "platinum"
  | "sapphire";

interface BrandingFormType {
  text_color: string;
  background_color: string;
  button_color: string;
  button_text_color: string;
  box_color: string;
  box_bg_color: string;
  header_color: string;
  header_active_color: string;
}

interface BrandingImagesType {
  favicon: string;
  support_icon: string;
  app_logo: string;
  splash_screen: string;
}

type BRANDING_THEME_TYPE = {
  [key in BRANDING_THEME_OPTIONS]: BrandingFormType;
};

type BrandingImageTypes =
  | "favicon"
  | "support_icon"
  | "app_logo"
  | "splash_screen";

export const BrandingConfiguration = () => {
  const { data } = useAppSelector((state) => state.userdata);
  const [loading, setLoading] = useState(false);
  const [isThemeActive, setIsThemeActive] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<
    BRANDING_THEME_OPTIONS | ""
  >("");

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
    reset,
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
        type: "reseller",
      });

      toast.success("Reseller branding updated");
    } catch (error: any) {
      toastError(error);
    }
  };

  const getResellerBranding = useCallback(async () => {
    if (!data?.sub_domain) return;

    try {
      setLoading(true);
      const response = await requests.getFromDataStore({
        key_name: `${data.sub_domain}_branding`,
        type: "reseller",
      });

      if (response?.data && response?.data?.meta_data) {
        const metaData = JSON.parse(
          response.data.meta_data
        ) as BrandingFormType & BrandingImagesType;

        setImages({
          app_logo: metaData.app_logo,
          favicon: metaData.favicon,
          splash_screen: metaData.splash_screen,
          support_icon: metaData.support_icon,
        });

        setValue("background_color", metaData.background_color);
        setValue("box_bg_color", metaData.box_bg_color);
        setValue("box_color", metaData.box_color);
        setValue("button_color", metaData.button_color);
        setValue("button_text_color", metaData.button_text_color);
        setValue("header_active_color", metaData.header_active_color);
        setValue("header_color", metaData.header_color);
        setValue("text_color", metaData.text_color);
      }
    } catch (error) {
      toast.error("unable to load reseller branding");
    } finally {
      setLoading(false);
    }
  }, [data?.sub_domain, setValue]);

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
          file_name: generateRandomString(),
        });

        setImages((prev) => ({ ...prev, [file_key]: response.data.url }));
      } catch (error: any) {
        toastError(error?.message || "Something went wrong");
      } finally {
        setLoadingImages((prev) => ({ ...prev, [file_key]: false }));
      }
    }
  };

  useEffect(() => {
    if (isThemeActive && selectedTheme) {
      const selectedThemeData = BRANDING_THEMES[selectedTheme];

      Object.entries(selectedThemeData).map(([key, value]) =>
        setValue(key as any, value)
      );
    }

    if (!isThemeActive) {
      reset();
      setSelectedTheme("");
    }
  }, [isThemeActive, selectedTheme, setValue, reset]);

  useEffect(() => {
    getResellerBranding();
  }, [getResellerBranding]);

  return (
    <div className="">
      <div className="mb-5">
        <h4 className="text-lg text-[#3B3838] font-semibold">
          Branding configuration
        </h4>
      </div>
      <div className="mb-5 flex flex-col gap-y-5">
        <div className="flex items-center justify-between flex-wrap gap-y-2">
          <CustomToggle
            label="Use Custom Theme"
            checked={isThemeActive}
            onChange={(e) => setIsThemeActive(e.target.checked)}
          />
          <button
            className={`${getKYCStyles(
              isThemeActive ? "ACTIVE" : "INACTIVE"
            )} text-xs px-4 py-2 text-[#000000] font-semibold rounded-xl min-w-20 capitalize`}
          >
            {isThemeActive ? "Active" : "Inactive"}
          </button>
        </div>
        {isThemeActive ? (
          <select
            name="Theme_Selector"
            id="Theme_Selector"
            className={clsx(
              "outline-none transition-all duration-200  border rounded-2xl px-4 py-3 h-[2.5rem] md:h-[3rem] text-sm w-full",
              "border-[#CBD5E1] focus:ring-2 focus:ring-primary focus:ring-opacity-40 capitalize"
            )}
            onChange={(e) =>
              setSelectedTheme(e.target.value as BRANDING_THEME_OPTIONS | "")
            }
            value={selectedTheme}
          >
            <option value="">Select Theme</option>
            {Object.keys(BRANDING_THEMES).map((theme) => (
              <option value={theme} key={theme} className="capitalize">
                {theme}
              </option>
            ))}
          </select>
        ) : null}
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
            label="Button Color"
            {...register("button_color", { required: true })}
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
            label="Box Color"
            {...register("box_color", { required: true })}
            containerClassName="flex-col gap-y-1 !items-start"
          />
          <CustomColorInput
            labelClassName="text-xs text-[#5C5C60]"
            className="text-sm placeholder:text-sm h-[1.75rem] "
            label="Box BG Color"
            {...register("box_bg_color", { required: true })}
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
                    onImageDrop(files, rejectedFiles, "support_icon")
                  }
                  className="w-full"
                  showText={false}
                />
              </div>
            </div>
            <p className="text-xs text-[#B7B2B2]">Dimension: 2 x 1</p>
          </div>
          <div className="flex flex-col gap-y-1">
            <h5 className="text-sm font-semibold text-[#000000]">Favicon</h5>
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
                    "image/png": [".png"],
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
            <h5 className="text-sm font-semibold text-[#000000]">App Logo</h5>
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
            <p className="text-xs text-[#B7B2B2]">Dimension: 2 x 1</p>
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
                    onImageDrop(files, rejectedFiles, "splash_screen")
                  }
                  className="w-full"
                  showText={false}
                />
              </div>
            </div>
            <p className="text-xs text-[#B7B2B2]">Dimension: 2 x 1</p>
          </div>
        </div>

        {Object.values(loadingImages).some((image) => image === true) ? (
          <p className="text-xs text-[#F40B0B]  italic font-medium">
            Uploading images...
          </p>
        ) : null}

        <CustomButton
          className="w-fit rounded-xl py-2 px-6 text-sm"
          disabled={
            isSubmitting ||
            Object.values(images).some((image) => image === "") ||
            loading
          }
          isloading={isSubmitting || loading}
        >
          Save
        </CustomButton>
      </form>
    </div>
  );
};

const BRANDING_THEMES: BRANDING_THEME_TYPE = {
  metallic: {
    text_color: "#FFFFFF",
    background_color: "#000000",
    button_color: "#F1D643",
    button_text_color: "#000000",
    box_color: "#FFFFFF",
    box_bg_color: "#3E3E3E",
    header_color: "#FFFFFF",
    header_active_color: "#F1D643",
  },
  nature: {
    text_color: "#FFFFFF",
    background_color: "#09101C",
    button_color: "#2C9E83",
    button_text_color: "#09101C",
    box_color: "#91E4B7",
    box_bg_color: "#09101C",
    header_color: "#91E4B7",
    header_active_color: "#2C9E83",
  },
  flowery: {
    text_color: "#505050",
    background_color: "#F5F5F5",
    button_color: "#9B7DF0",
    button_text_color: "#09101C",
    box_color: "#FFFFFF",
    box_bg_color: "#3D2482",
    header_color: "#3D2482",
    header_active_color: "#32204F",
  },
  platinum: {
    text_color: "#FFFFFF",
    background_color: "#09101C",
    button_color: "#FFFFFF",
    button_text_color: "#09101C",
    box_color: "#FFFFFF",
    box_bg_color: "#09101C",
    header_color: "#D7D7D7",
    header_active_color: "#FFFFFF",
  },
  sapphire: {
    text_color: "#505050",
    background_color: "#FFFFFF",
    button_color: "#003EDD",
    button_text_color: "#FFFFFF",
    box_color: "#012A94",
    box_bg_color: "#D9DDFF",
    header_color: "#003EDD",
    header_active_color: "#D9DDFF",
  },
};
