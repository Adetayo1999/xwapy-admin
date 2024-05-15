import React, { InputHTMLAttributes, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FieldError } from "react-hook-form";
import clsx from "clsx";
import { renderInputLabel } from "@/common/helpers/label-text";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string | React.ReactNode;
  error?: FieldError;
  labelClassName?: string;
}

const CustomInput: React.FC<CustomInputProps> = React.forwardRef(
  (
    { label, className, error, type, name, required, labelClassName, ...rest },
    ref
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handlePasswordToggle = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      e.preventDefault();
      setIsPasswordVisible((prev) => !prev);
    };

    return (
      <div>
        <div className="flex flex-col gap-y-2 mb-1">
          {renderInputLabel(required, label, labelClassName)}
          <div className="relative">
            <input
              className={clsx(
                "outline-none transition-all duration-200 text-base border rounded-2xl px-4 py-3 h-[2.5rem] md:h-[3rem]  w-full",
                "border-[#CBD5E1] focus:ring-2 focus:ring-primary focus:ring-opacity-40",
                type === "password" ? "pr-8" : "",
                className
              )}
              type={isPasswordVisible ? "text" : type}
              name={name}
              {...rest}
              ref={ref as any}
              required={required}
            />
            {name?.includes("password") && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={handlePasswordToggle}
              >
                {!isPasswordVisible ? (
                  <FaEye className=" text-gray-700 hover:text-gray-900" />
                ) : (
                  <FaEyeSlash className=" text-gray-700 hover:text-gray-900" />
                )}
              </button>
            )}
          </div>
        </div>
        <div className="h-4">
          {error && (
            <span className="text-xs text-red-500 font-bold">
              {error.message || "field required"}
            </span>
          )}
        </div>
      </div>
    );
  }
);

export default CustomInput;
