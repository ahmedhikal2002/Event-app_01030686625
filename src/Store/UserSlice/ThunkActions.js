import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

export const bookEvent = createAsyncThunk(
  "user/bookEvent",
  async (payload, thunkApi) => {
    const { rejectWithValue, getState } = thunkApi;
    const userId = getState().auth.user.uid;
    try {
      const docRef = doc(
        db,
        "booked Events",
        userId,
        "booking",
        payload.item.id
      );
      const event = {
        id: payload.item.id,
        name: payload.item.name,
        img: payload.item.img,
        price: payload.item.price,
        description: payload.item.description,
        date: payload.item.date,
        venue: payload.item.venue,
        category: payload.item.category,
      };
      await setDoc(docRef, event);
      return event;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.message);
    }
  }
);

export const getBookedEvents = createAsyncThunk(
  "user/getBookedEvents",
  async (_, thunkApi) => {
    const { rejectWithValue, getState } = thunkApi;
    const userId = getState().auth.user.uid;
    try {
      const collectionRef = collection(db, "booked Events", userId, "booking");

      const snapshot = await getDocs(collectionRef);
      const bookedEvents = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return bookedEvents;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const getEventById = createAsyncThunk(
  "user/getEventById",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const collectionRef = doc(db, "events", id);
      const events = await getDoc(collectionRef);
      const event = events.data();

      return event;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const cancelEvent = createAsyncThunk(
  "user/cancelEvent",
  async (id, thunkApi) => {
    const { rejectWithValue, getState } = thunkApi;
    const userId = getState().auth.user.uid;
    try {
      const docRef = doc(db, "booked Events", userId, "booking", id);

      await deleteDoc(docRef);
      return id;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
