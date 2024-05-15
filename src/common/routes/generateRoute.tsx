import { Route } from "react-router-dom";
import { IModalRoute, IRoute } from "../types";
import { Suspense } from "react";
import AuthLayout from "@/modules/auth/components/layout";
import { DashboardLayout } from "@/modules/dashboard/components/layout";

export const generateRoute = ({ path, Component, access }: IRoute) => {
  return (
    <Route
      key={`${path}`}
      element={access === "guest-only" ? <AuthLayout /> : <DashboardLayout />}
    >
      <Route
        path={path}
        element={
          //TODO: Create a fallback loader
          <Suspense fallback={<p>Loading</p>}>
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
