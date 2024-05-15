import React, { InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";
import clsx from "clsx";
import { renderInputLabel } from "@/common/helpers/label-text";

interface CustomColorInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string | React.ReactNode;
  error?: FieldError;
  labelClassName?: string;
  containerClassName?: string;
}

const CustomColorInput: React.FC<CustomColorInputProps> = React.forwardRef(
  (
    {
      label,
      className,
      error,
      name,
      required,
      labelClassName,
      containerClassName,
      ...rest
    },
    ref
  ) => {
    return (
      <div>
        <div
          className={clsx("flex items-center gap-x-5 mb-1", containerClassName)}
        >
          {renderInputLabel(required, label, labelClassName)}
          <div className="relative">
            <input
              className={clsx(className)}
              name={name}
              {...rest}
              type="color"
              ref={ref as any}
              required={required}
            />
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

export default CustomColorInput;
