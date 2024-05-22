import { toastError } from "@/common/helpers/error";
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as tp from "../../../services/types";
import { requests } from "@/common/services/requests";

export const getTransactionsThunk = createAsyncThunk<
  any,
  tp.ListTransactionsRequestType
>(
  "transactions/getTransactionsThunk",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await requests.listTransactions(data);
      return fulfillWithValue(response.data.list);
    } catch (error: any) {
      toastError(error);
      return rejectWithValue(error.message);
    }
  }
);
