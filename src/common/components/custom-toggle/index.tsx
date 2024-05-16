import clsx from "clsx";
import { InputHTMLAttributes } from "react";

interface CustomToggleProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClassName?: string;
}

export const CustomToggle: React.FC<CustomToggleProps> = ({
  label,
  labelClassName,
  ...rest
}) => {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input type="checkbox" value="" className="sr-only peer" {...rest} />
      <div className="relative w-10 h-5 bg-[#D9D9D9] rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0 after:start-[1px] after:bg-[#F40B0B] peer-checked:after:bg-[#14AD6D] after:rounded-full after:h-5 after:w-5 after:transition-all "></div>
      {label ? (
        <span
          className={clsx(
            "ms-3 text-sm font-medium text-[#B7B2B2] ",
            labelClassName
          )}
        >
          {label}
        </span>
      ) : null}
    </label>
  );
};
