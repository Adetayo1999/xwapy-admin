import { Route } from "react-router-dom";
import { IModalRoute, IRoute } from "../types";
import { Suspense } from "react";
import AuthLayout from "@/modules/auth/components/layout";
import { SuspenseLoader } from "../components/suspense-loader";
import { defaultRoles } from "../helpers/app-roles";
import { AdminLayout } from "@/modules/admin/components/layout";
import { ResellerLayout } from "@/modules/reseller/components/layout";

const role = defaultRoles.reseller;

export const generateRoute = ({
  path,
  Component,
  access,
  allowedRoles,
}: IRoute) => {
  if (access === "guest-only") {
    return (
      <Route key={`${path}`} element={<AuthLayout />}>
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
  }

  if (allowedRoles?.length && allowedRoles.includes(role)) {
    return (
      <Route
        key={`${path}`}
        element={
          role === defaultRoles.admin ? <AdminLayout /> : <ResellerLayout />
        }
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
  }
};

export const generateModalRoute = ({
  component: Component,
  path,
  allowedRole,
}: IModalRoute) => {
  if (allowedRole === role)
    return <Route key={path} element={<Component />} path={path} />;
};
