import {
  NavigateOptions,
  To,
  useLocation,
  useNavigate,
} from "react-router-dom";

export const useModalNavigate = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (to: To, options?: NavigateOptions | undefined) => {
    if (options) {
      return navigate(to, {
        ...options,
        state: { ...options.state, previousLocation: location },
      });
    }
    return navigate(to, {
      state: { previousLocation: location },
    });
  };
};
