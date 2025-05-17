import { createSlice } from "@reduxjs/toolkit";
import {
  bookEvent,
  cancelEvent,
  getBookedEvents,
  getEventById,
} from "./ThunkActions";

const initialState = {
  bookedEvents: [],
  error: null,
  loading: false,
  event: [],
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(bookEvent.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(bookEvent.fulfilled, (state, action) => {
      state.loading = false;
      state.bookedEvents.push(action.payload);
      state.error = null;
    });
    builder.addCase(bookEvent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getBookedEvents.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBookedEvents.fulfilled, (state, action) => {
      state.loading = false;
      state.bookedEvents = action.payload;
      state.error = null;
    });
    builder.addCase(getBookedEvents.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getEventById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getEventById.fulfilled, (state, action) => {
      state.loading = false;
      state.event = action.payload;
    });
    builder.addCase(getEventById.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(cancelEvent.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(cancelEvent.fulfilled, (state, action) => {
      state.error = null;
      state.loading = false;
      state.bookedEvents = state.bookedEvents.filter(
        (event) => event.id !== action.payload
      );
    });
    builder.addCase(cancelEvent.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export default UserSlice.reducer;
