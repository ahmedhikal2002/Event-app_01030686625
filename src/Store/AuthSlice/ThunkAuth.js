import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const register = createAsyncThunk(
  "auth/register",
  async ({ email, password, firstName, lastName }, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user.user, {
        displayName: `${firstName} ${lastName}`,
      });
      const docref = doc(db, "users", user.user.uid);
      await setDoc(docref, {
        uid: user.user.uid,
        email: user.user.email,
        displayName: user.user.displayName,
        role: "user",
      });

      return {
        uid: user.user.uid,
        email: user.user.email,
        displayName: user.user.displayName,
        role: "user",
      };
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      const docRef = doc(db, "users", user.user.uid);
      const userRef = await getDoc(docRef);
      const roleRef = userRef.data().role;

      return {
        uid: user.user.uid,
        email: user.user.email,
        displayName: user.user.displayName,
        role: roleRef || "user",
      };
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkApi) => {
  const { rejectWithValue } = thunkApi;
  try {
    await signOut(auth);
  } catch (e) {
    return rejectWithValue(e.message);
  }
});
