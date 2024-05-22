import { combineReducers } from "@reduxjs/toolkit";
import metricsSlice from "./reducers/metrics-slice";
import transactions from "./reducers/transactions";
import resellers from "./reducers/resellers";
import transactionsGroup from "./reducers/transactions-group";
import users from "./reducers/users";

export const rootReducer = combineReducers({
  metrics: metricsSlice,
  transactions,
  resellers,
  transaction_group: transactionsGroup,
  users,
});
