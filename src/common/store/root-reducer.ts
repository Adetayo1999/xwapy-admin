import { combineReducers } from "@reduxjs/toolkit";
import metricsSlice from "./reducers/metrics-slice";
import transactions from "./reducers/transactions";
import resellers from "./reducers/resellers";
import transactionsGroup from "./reducers/transactions-group";
import users from "./reducers/users";
import userdata from "./reducers/userdata";
import transactionDetails from "./reducers/transaction-details";

export const rootReducer = combineReducers({
  metrics: metricsSlice,
  transactions,
  resellers,
  transaction_group: transactionsGroup,
  users,
  userdata,
  transactionDetails,
});
