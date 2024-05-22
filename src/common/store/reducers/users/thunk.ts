import { toastError } from "@/common/helpers/error";
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as tp from "../../../services/types";
import { requests } from "@/common/services/requests";

export const getUsersThunk = createAsyncThunk<any, tp.GetUsersRequestType>(
  "transactions/getUsersThunk",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await requests.getUsers(data);
      return fulfillWithValue(response.data.list);
    } catch (error: any) {
      toastError(error);
      return rejectWithValue(error.message);
    }
  }
);

export const getUserSettingsThunk = createAsyncThunk<
  any,
  tp.GetUsersSettingsRequestType
>(
  "transactions/getUserSettingsThunk",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await requests.getUserSettings(data);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      toastError(error);
      return rejectWithValue(error.message);
    }
  }
);
