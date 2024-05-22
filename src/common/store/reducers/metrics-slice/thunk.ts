import { createAsyncThunk } from "@reduxjs/toolkit";
import { toastError } from "@/common/helpers/error";
import { requests } from "@/common/services/requests";

export const getMetricsThunk = createAsyncThunk(
  "metrics/getMetricsThunk",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await requests.getOverview();
      return fulfillWithValue(data);
    } catch (error: any) {
      toastError(error);
      return rejectWithValue(error.message);
    }
  }
);
