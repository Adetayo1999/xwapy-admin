import { toastError } from "@/common/helpers/error";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { requests } from "@/common/services/requests";
import * as tp from "../../../services/types";

export const getResellersThunk = createAsyncThunk(
  "transactions/getTransactionsSliceThunk",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await requests.getResellers();
      return fulfillWithValue(response.data.list);
    } catch (error: any) {
      toastError(error);
      return rejectWithValue(error.message);
    }
  }
);

export const createResellerThunk = createAsyncThunk<
  any,
  tp.CreateResellerRequestType
>(
  "transactions/createResellerThunk",
  async (data, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      const response = await requests.createReseller(data);
      dispatch(getResellersThunk());
      return fulfillWithValue(response.data);
    } catch (error: any) {
      toastError(error);
      return rejectWithValue(error.message);
    }
  }
);

export const getResellerSettingsThunk = createAsyncThunk<
  any,
  tp.GetResellersSettingsRequestType
>(
  "transactions/getResellerSettingsThunk",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await requests.getResellerSettings(data);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      toastError(error);
      return rejectWithValue(error.message);
    }
  }
);

export const saveResellerSettingsThunk = createAsyncThunk<
  any,
  tp.SaveSellerSettingsRequestBodyType & tp.SaveSellerSettingsRequestType
>(
  "transactions/saveResellerSettingsThunk",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await requests.saveResellerSettiings(data, {
        filter: data.filter,
      });
      return fulfillWithValue(response.data);
    } catch (error: any) {
      toastError(error);
      return rejectWithValue(error.message);
    }
  }
);
