import { lazy } from "react";
import { IRoute } from "../types";
import { paths } from "./paths";

const loadModules = (module: string, link: string) =>
  lazy(() => import(`../../modules/${module}/pages/${link}/index.tsx`));

export const routes: IRoute[] = [
  {
    access: "guest-only",
    Component: loadModules("auth", "login"),
    path: paths.auth.login,
  },
  {
    access: "loggedin-user",
    Component: loadModules("dashboard", "overview"),
    path: paths.dashboard.overview,
  },
  {
    access: "loggedin-user",
    Component: loadModules("dashboard", "resellers"),
    path: paths.dashboard.resellers,
  },
  {
    access: "loggedin-user",
    Component: loadModules("dashboard", "transactions"),
    path: paths.dashboard.transactions,
  },
  {
    access: "loggedin-user",
    Component: loadModules("dashboard", "reseller-transactions"),
    path: paths.dashboard.resellers_transactions,
  },
  {
    access: "loggedin-user",
    Component: loadModules("dashboard", "users"),
    path: paths.dashboard.users,
  },
];
