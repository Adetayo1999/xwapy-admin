import { SellerDataType } from "@/common/types";
import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getResellersThunk } from "./thunk";

interface ResellerStateType {
  data: SellerDataType[];
  loading: boolean;
}

const initialState: ResellerStateType = {
  data: [],
  loading: false,
};

const resellerSlice = createSlice({
  name: "resellers",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getResellersThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getResellersThunk.fulfilled, (state, action) => {
      state.data = action.payload;
    });

    builder.addMatcher(
      isAnyOf(getResellersThunk.fulfilled, getResellersThunk.rejected),
      (state) => {
        state.loading = false;
      }
    );
  },
});

export default resellerSlice.reducer;
