import { Route } from "react-router-dom";
import { IModalRoute, IRoute } from "../types";
import { Suspense } from "react";
import AuthLayout from "@/modules/auth/components/layout";
import { DashboardLayout } from "@/modules/dashboard/components/layout";
import { SuspenseLoader } from "../components/suspense-loader";

export const generateRoute = ({ path, Component, access }: IRoute) => {
  return (
    <Route
      key={`${path}`}
      element={access === "guest-only" ? <AuthLayout /> : <DashboardLayout />}
    >
      <Route
        path={path}
        element={
          <Suspense fallback={<SuspenseLoader />}>
            <Component />
          </Suspense>
        }
      />
    </Route>
  );
};

export const generateModalRoute = ({
  component: Component,
  path,
}: IModalRoute) => {
  return <Route key={path} element={<Component />} path={path} />;
};
