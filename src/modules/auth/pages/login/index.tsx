import { LoginForm } from "../../components/login-form";

export default function Login() {
  return (
    <div className="bg-white shadow-[0px_4px_39px_0px_#00000040] rounded-3xl min-h-[32.875rem] p-[3rem]">
      <div className="mb-6">
        <h3 className="text-secondary font-bold text-2xl">Admin Login</h3>
      </div>
      <LoginForm />
    </div>
  );
}
