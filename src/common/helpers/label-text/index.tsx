import clsx from "clsx";

export const renderInputLabel = (
  required?: boolean,
  label?: string | React.ReactNode,
  labelClassName?: string
) => {
  if (typeof label === "string")
    return (
      <label
        className={clsx(
          `text-sm font-semibold text-[#000000]`,
          required
            ? "relative after:absolute after:content-['*'] after:text-red-600"
            : "",
          labelClassName
        )}
      >
        {label}
      </label>
    );
  return label;
};
