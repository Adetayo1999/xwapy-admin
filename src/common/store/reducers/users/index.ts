import { UserDataType } from "@/common/types";
import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getUsersThunk } from "./thunk";

interface UserStateType {
  data: UserDataType[];
  loading: boolean;
}

const initialState: UserStateType = {
  loading: false,
  data: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getUsersThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getUsersThunk.fulfilled, (state, action) => {
      if (action.payload?.length) {
        state.data = action.payload;
      }
    });

    builder.addMatcher(
      isAnyOf(getUsersThunk.fulfilled, getUsersThunk.rejected),
      (state) => {
        state.loading = false;
      }
    );
  },
});

export default usersSlice.reducer;
