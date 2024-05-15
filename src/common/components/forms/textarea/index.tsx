import React, { TextareaHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";
import { renderInputLabel } from "@/common/helpers/label-text";
import clsx from "clsx";

interface CustomTextareaProps extends TextareaHTMLAttributes<any> {
  label?: string | React.ReactNode;
  error?: FieldError;
  labelClassName?: string;
}

const CustomTextarea: React.FC<CustomTextareaProps> = React.forwardRef(
  ({ label, className, error, required, labelClassName, ...rest }, ref) => {
    return (
      <div>
        <div className="flex flex-col gap-y-2 mb-1">
          {renderInputLabel(required, label, labelClassName)}
          <div className="relative">
            <textarea
              cols={30}
              rows={4}
              {...rest}
              ref={ref as any}
              className={clsx(
                "outline-none transition-all duration-200 text-base border rounded-xl px-4 py-3  w-full disabled:cursor-not-allowed",
                "border-[#CBD5E1]  focus:ring-2 focus:ring-primary focus:ring-opacity-40",
                className
              )}
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

export default CustomTextarea;
