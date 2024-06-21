import { toastError } from "@/common/helpers/error";
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as tp from "../../../services/types";
import { requests } from "@/common/services/requests";

export const getTransactionDetailsThunk = createAsyncThunk<
  any,
  tp.GetTransactionDetailsRequestType
>(
  "transactionDetails/getTransactionDetailsThunk",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await requests.getTransactionDetails(data);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      toastError(error);
      return rejectWithValue(error.message);
    }
  }
);
