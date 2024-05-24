import { lazy } from "react";
import { IRoute } from "../types";
import { paths } from "./paths";
import { defaultRoles } from "../helpers/app-roles";

const loadModules = (module: string, link: string) =>
  lazy(() => import(`../../modules/${module}/pages/${link}/index.tsx`));

export const routes: IRoute[] = [
  {
    access: "guest-only",
    Component: loadModules("auth", "login"),
    path: paths.auth.login,
  },

  // Admin Routes
  {
    access: "loggedin-user",
    Component: loadModules("admin", "overview"),
    path: paths.dashboard.admin.overview,
    allowedRoles: [defaultRoles.admin],
  },
  {
    access: "loggedin-user",
    Component: loadModules("admin", "resellers"),
    path: paths.dashboard.admin.resellers,
    allowedRoles: [defaultRoles.admin],
  },
  {
    access: "loggedin-user",
    Component: loadModules("admin", "transactions"),
    path: paths.dashboard.admin.transactions,
    allowedRoles: [defaultRoles.admin],
  },
  {
    access: "loggedin-user",
    Component: loadModules("admin", "reseller-transactions"),
    path: paths.dashboard.admin.resellers_transactions,
    allowedRoles: [defaultRoles.admin],
  },
  {
    access: "loggedin-user",
    Component: loadModules("admin", "users"),
    path: paths.dashboard.admin.users,
    allowedRoles: [defaultRoles.admin],
  },

  // Reseller routes
  {
    access: "loggedin-user",
    Component: loadModules("reseller", "overview"),
    path: paths.dashboard.resellers.overview,
    allowedRoles: [defaultRoles.reseller],
  },
  {
    access: "loggedin-user",
    Component: loadModules("reseller", "transactions"),
    path: paths.dashboard.resellers.transactions,
    allowedRoles: [defaultRoles.reseller],
  },
  {
    access: "loggedin-user",
    Component: loadModules("reseller", "users"),
    path: paths.dashboard.resellers.users,
    allowedRoles: [defaultRoles.reseller],
  },
];
