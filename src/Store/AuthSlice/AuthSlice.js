import { createSlice } from "@reduxjs/toolkit";
import { login, logout, register } from "./ThunkAuth";

const initialState = {
  user: null,
  error: "",
  loading: false,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userChanged: (state, action) => {
      state.user = action.payload;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.error = null;
      state.loading = true;
      state.user = null;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.error = null;
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.user = null;
      state.error = action.payload;
      state.loading = false;
    });

    builder.addCase(login.pending, (state) => {
      state.error = null;
      state.loading = true;
      state.user = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.error = null;
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.user = null;
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.error = null;
      state.loading = false;
      state.user = null;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export default AuthSlice.reducer;
export const { userChanged } = AuthSlice.actions;
