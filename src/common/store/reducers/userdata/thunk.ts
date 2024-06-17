import { toastError } from "@/common/helpers/error";
import { requests } from "@/common/services/requests";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUserThunk = createAsyncThunk(
  "user/getUserThunk",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await requests.getUser();
      return fulfillWithValue(response.data);
    } catch (error: any) {
      toastError(error);
      return rejectWithValue(error.message);
    }
  }
);
