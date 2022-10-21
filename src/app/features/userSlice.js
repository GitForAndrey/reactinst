import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { toast } from "react-toastify";

const initialState = {
  activeUser: { id: "sdJH879dfJKJ", userName: "Andrii Petrov" },
  allUsers: [
    { id: "sdJH879dfJKJ", userName: "Andrii" },
    { id: "sdJ56743KJ", userName: "Slava" },
    { id: "sdJfg77dfg3KJ", userName: "Ivan Sergeev" },
    { id: "23fdf6743KJ", userName: "Tatjana Rov" },
    { id: "asdf89009b3KJ", userName: "Oksana" },
  ],
  status: null,
  error: null,
};

export const createUser = createAsyncThunk(
  "users/userSlice",
  async (data, { dispatch, rejectWithValue }) => {
    const { email, password } = data;
    console.log(data);
    try {
      const signIn = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = signIn.user;

      //await dispatch(setAllPosts(data));
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const signInUser = createAsyncThunk(
  "users/userSlice",
  async (data, { dispatch, rejectWithValue }) => {
    const { email, password } = data;
    console.log(data);
    try {
      const signIn = await signInWithEmailAndPassword(auth, email, password);
      const user = signIn.user;
      console.log(user);
      //await dispatch(setAllPosts(data));
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // addPost: {
    //   reducer: (state, action) => {
    //     state.push(action.payload);
    //   },
    //   prepare: (title, text) => {
    //     const id = nanoid();
    //     return { payload: { id, title, text } };
    //   },
    // },
  },
  extraReducers: {
    [createUser.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
      toast.error(action.payload);
    },
  },
});

export const selectAllUsers = (state) => state.users.allUsers;
export const selectActiveUser = (state) => state.users.activeUser;

export const {} = userSlice.actions;
export default userSlice.reducer;
