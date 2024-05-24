import { paths } from "./paths";

// Admin Modals
import CreateSeller from "@/modules/admin/modals/create-reseller";
import AdminResellerSettings from "@/modules/admin/modals/reseller-settings";
import AdminTransactionDetails from "@/modules/admin/modals/transaction-details";
import AdminUserSettings from "@/modules/admin/modals/user-settings";

// Reseller Modals
import ResellerSettings from "@/modules/reseller/modals/reseller-settings";
import ResellerTransactionDetails from "@/modules/reseller/modals/transaction-details";
import ResellerUserSettings from "@/modules/reseller/modals/user-settings";

import { defaultRoles } from "../helpers/app-roles";

export const modalRoutes = [
  {
    component: CreateSeller,
    path: paths.dashboard.admin.modals.create_reseller,
    allowedRole: defaultRoles.admin,
  },
  {
    component: AdminResellerSettings,
    path: paths.dashboard.admin.modals.reseller_settings,
    allowedRole: defaultRoles.admin,
  },
  {
    component: AdminTransactionDetails,
    path: paths.dashboard.admin.modals.transaction_details,
    allowedRole: defaultRoles.admin,
  },
  {
    component: AdminUserSettings,
    path: paths.dashboard.admin.modals.user_settings,
    allowedRole: defaultRoles.admin,
  },

  {
    component: ResellerSettings,
    path: paths.dashboard.resellers.modals.reseller_settings,
    allowedRole: defaultRoles.reseller,
  },
  {
    component: ResellerTransactionDetails,
    path: paths.dashboard.resellers.modals.transaction_details,
    allowedRole: defaultRoles.reseller,
  },
  {
    component: ResellerUserSettings,
    path: paths.dashboard.resellers.modals.user_settings,
    allowedRole: defaultRoles.reseller,
  },
];
