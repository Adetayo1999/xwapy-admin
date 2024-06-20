import { createAsyncThunk } from "@reduxjs/toolkit";
import { toastError } from "@/common/helpers/error";
import { requests } from "@/common/services/requests";
import { BaseRequestType } from "@/common/services/types";

export const getMetricsThunk = createAsyncThunk<any, BaseRequestType>(
  "metrics/getMetricsThunk",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data: responseData } = await requests.getOverview(data);
      return fulfillWithValue(responseData);
    } catch (error: any) {
      toastError(error);
      return rejectWithValue(error.message);
    }
  }
);
