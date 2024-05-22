import toast from "react-hot-toast";

export const errorFormatter = (error: any): string => {
  if (typeof error?.message === "string") return error?.message;

  return "Something went wrong";
};

export const toastError = (error: unknown) => {
  const errorMessage = errorFormatter(error);
  toast.error(errorMessage);
};
