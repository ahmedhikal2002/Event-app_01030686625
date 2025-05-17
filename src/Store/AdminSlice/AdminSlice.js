import { createSlice } from "@reduxjs/toolkit";
import {
  addEvent,
  deleteEvent,
  getAllEvents,
  updateEvent,
} from "./ThunkActions";

const initialState = {
  events: [],
  loading: false,
  error: null,
};
const AdminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addEvent.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addEvent.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(addEvent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getAllEvents.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllEvents.fulfilled, (state, action) => {
      state.loading = false;
      state.events = action.payload;
      state.error = null;
    });
    builder.addCase(getAllEvents.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(deleteEvent.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteEvent.fulfilled, (state, action) => {
      state.loading = false;
      state.events = state.events.filter(
        (event) => event.id !== action.payload
      );
    });
    builder.addCase(deleteEvent.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(updateEvent.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateEvent.fulfilled, (state, action) => {
      state.loading = false;
      state.events = state.events.map((event) => {
        const { name, description, price, category, img, venue, date } =
          action.payload;
        if (event.id === action.payload.id) {
          return {
            ...event,
            name: name,
            description: description,
            price: price,
            category: category,
            img: img,
            venue: venue,
            date: date,
          };
        } else {
          return event;
        }
      });
    });
    builder.addCase(updateEvent.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export default AdminSlice.reducer;
