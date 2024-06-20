import { toastError } from "@/common/helpers/error";
import { requests } from "@/common/services/requests";
import { BaseRequestType } from "@/common/services/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUserThunk = createAsyncThunk<any, BaseRequestType>(
  "user/getUserThunk",
  async (data, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await requests.getUser(data);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      toastError(error);
      return rejectWithValue(error.message);
    }
  }
);
