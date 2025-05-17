import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice/AuthSlice";
import AdminSlice from "./AdminSlice/AdminSlice";
import UserSlice from "./UserSlice/UserSlice";
export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    admin: AdminSlice,
    user: UserSlice,
  },
});
