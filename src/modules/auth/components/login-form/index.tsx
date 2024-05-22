import CustomButton from "@/common/components/forms/button";
import CustomInput from "@/common/components/forms/input";
import { toastError } from "@/common/helpers/error";
import { paths } from "@/common/routes";
import { requests } from "@/common/services/requests";
import { storeUserToken } from "@/common/services/storage";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

interface LoginFormType {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<LoginFormType>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
    try {
      const response = await requests.login(data);
      storeUserToken(response.data.token);
      navigate(paths.dashboard.overview);
    } catch (error) {
      toastError(error);
    }
  };

  return (
    <div className="">
      <form className="flex flex-col gap-y-5" onSubmit={handleSubmit(onSubmit)}>
        <CustomInput
          label="Enter Email"
          {...register("email", { required: true })}
          error={errors.email}
        />
        <div className="">
          <CustomInput
            label="Enter Password"
            {...register("password", { required: true })}
            error={errors.password}
            type="password"
          />
          <div className="text-right mt-2">
            <Link to="#" className="text-sm text-[#000000] font-medium">
              Forgot Password
            </Link>
          </div>
        </div>

        <CustomButton
          className="px-[4.188rem] py-3 w-fit text-sm rounded-xl"
          isloading={isSubmitting}
        >
          Login
        </CustomButton>
      </form>
    </div>
  );
};
