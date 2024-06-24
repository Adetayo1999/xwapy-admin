import { TransactionDataType } from "@/common/types";
import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getTransactionsThunk } from "./thunks";

interface TransactionStateType {
  loading: boolean;
  data: TransactionDataType[];
}

const initialState: TransactionStateType = {
  data: [],
  loading: false,
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getTransactionsThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getTransactionsThunk.fulfilled, (state, action) => {
      if (action.payload?.length) {
        state.data = action.payload;
      }
    });

    builder.addMatcher(
      isAnyOf(getTransactionsThunk.fulfilled, getTransactionsThunk.rejected),
      (state) => {
        state.loading = false;
      }
    );
  },
});

export default transactionsSlice.reducer;
