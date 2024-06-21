import { createSlice } from "@reduxjs/toolkit";

interface TransactionDetailsStateType {
  loading: boolean;
  data: any;
}

const initialState: TransactionDetailsStateType = {
  data: {},
  loading: false,
};

const transactionsSlice = createSlice({
  name: "transactionDetails",
  initialState,
  reducers: {},
  extraReducers() {
    // builder.addCase(getTransactionDetailsThunk.pending, (state) => {
    //   state.loading = true;
    // });
    // builder.addCase(getTransactionDetailsThunk.fulfilled, (state, action) => {
    //   state.data = action.payload;
    // });
    // builder.addMatcher(
    //   isAnyOf(
    //     getTransactionDetailsThunk.fulfilled,
    //     getTransactionDetailsThunk.rejected
    //   ),
    //   (state) => {
    //     state.loading = false;
    //   }
    // );
  },
});

export default transactionsSlice.reducer;
