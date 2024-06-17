import { UserType } from "@/common/types";
import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getUserThunk } from "./thunk";

interface UserStateType {
  loading: boolean;
  data: UserType | null;
  is_fetched: boolean;
}

const initialState: UserStateType = {
  loading: false,
  data: null,
  is_fetched: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getUserThunk.pending, (state) => {
      state.loading = true;
      state.is_fetched = false;
    });

    builder.addCase(getUserThunk.fulfilled, (state, action) => {
      state.data = action.payload;
    });

    builder.addMatcher(
      isAnyOf(getUserThunk.fulfilled, getUserThunk.rejected),
      (state) => {
        state.loading = false;
        state.is_fetched = true;
      }
    );
  },
});

export default userSlice.reducer;
