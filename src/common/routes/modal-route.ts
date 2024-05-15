import CreateSeller from "@/modules/dashboard/modals/create-reseller";
import { paths } from "./paths";
import ResellerSettings from "@/modules/dashboard/modals/reseller-settings";
import TransactionDetails from "@/modules/dashboard/modals/transaction-details";
import UserSettings from "@/modules/dashboard/modals/user-settings";

export const modalRoutes = [
  {
    component: CreateSeller,
    path: paths.dashboard.modals.create_reseller,
  },
  {
    component: ResellerSettings,
    path: paths.dashboard.modals.reseller_settings,
  },
  {
    component: TransactionDetails,
    path: paths.dashboard.modals.transaction_details,
  },
  {
    component: UserSettings,
    path: paths.dashboard.modals.user_settings,
  },
];
