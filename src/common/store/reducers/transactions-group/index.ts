import { TransactionGroupDataType } from "@/common/types";
import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getTransactionsGroupThunk } from "./thunk";

interface TransactionGroupStateType {
  data: TransactionGroupDataType[];
  loading: boolean;
}

const initialState: TransactionGroupStateType = {
  data: [],
  loading: false,
};

const transactionGroupSlice = createSlice({
  name: "transaction_group",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getTransactionsGroupThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getTransactionsGroupThunk.fulfilled, (state, action) => {
      if (action.payload?.length) {
        state.data = action.payload;
      }
    });

    builder.addMatcher(
      isAnyOf(
        getTransactionsGroupThunk.fulfilled,
        getTransactionsGroupThunk.rejected
      ),
      (state) => {
        state.loading = false;
      }
    );
  },
});

export default transactionGroupSlice.reducer;
