import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, stroage } from "../../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

export const addEvent = createAsyncThunk(
  "admin/addEvent",
  async (payload, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const stroageRef = ref(stroage, `images/${payload.eventImg.name}`);
      await uploadBytes(stroageRef, payload.eventImg);
      const imgUrl = await getDownloadURL(stroageRef);
      const date = {
        name: payload.eventName,
        category: payload.eventCategory,
        venue: payload.eventVenue,
        date: payload.eventDate,
        price: payload.eventPrice,
        img: imgUrl,
        description: payload.description,
      };
      const collectionRef = collection(db, "events");
      await addDoc(collectionRef, date);
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const getAllEvents = createAsyncThunk(
  "admin/getEvents",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const colectionRef = collection(db, "events");
      const snapshot = await getDocs(colectionRef);
      const events = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return events;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const deleteEvent = createAsyncThunk(
  "admin/deleteEvent",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const docRef = doc(db, "events", id);
      await deleteDoc(docRef);
      return id;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.message);
    }
  }
);

export const updateEvent = createAsyncThunk(
  "admin/updateEvent",
  async (payload, thunApi) => {
    const { rejectWithValue } = thunApi;

    try {
      if (payload.img.name) {
        const strogeRef = ref(stroage, `images/${payload.img.name}`);
        await uploadBytes(strogeRef, payload.img);
        const imgUrl = await getDownloadURL(strogeRef);
        const date = {
          name: payload.name,
          category: payload.category,
          venue: payload.venue,
          date: payload.date,
          price: payload.price,
          img: imgUrl,
          description: payload.description,
        };

        const docRef = doc(db, "events", payload.id);
        await updateDoc(docRef, date);
        return { ...date, id: payload.id };
      } else {
        const date = {
          name: payload.name,
          category: payload.category,
          venue: payload.venue,
          date: payload.date,
          price: payload.price,
          img: payload.oldImg,
          description: payload.description,
        };
        const docRef = doc(db, "events", payload.id);
        await updateDoc(docRef, date);
        return { ...date, id: payload.id };
      }
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.message);
    }
  }
);
