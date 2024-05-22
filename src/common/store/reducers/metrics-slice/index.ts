import { OverviewDataType } from "@/common/types";
import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getMetricsThunk } from "./thunk";

interface MetricsStateType {
  metrics: OverviewDataType | null;
  loading: boolean;
}

const initialState: MetricsStateType = {
  metrics: null,
  loading: false,
};

export const createMetricsSlice = createSlice({
  name: "metrics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMetricsThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getMetricsThunk.fulfilled, (state, action) => {
      state.metrics = action.payload;
    });

    builder.addMatcher(
      isAnyOf(getMetricsThunk.rejected, getMetricsThunk.fulfilled),
      (state) => {
        state.loading = false;
      }
    );
  },
});

export default createMetricsSlice.reducer;
