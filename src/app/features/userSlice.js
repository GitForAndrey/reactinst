import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { toast } from "react-toastify";

const initialState = {
  activeUser: {
    uid: "",
    userName: "",
    accessToken: "",
  },
  isAuth: false,
  allUsers: [
    { id: "sdJH879dfJKJ", userName: "Andrii Shevko" },
    { id: "sdJ56743KJ", userName: "Slava" },
    { id: "sdJfg77dfg3KJ", userName: "Ivan Sergeev" },
    { id: "23fdf6743KJ", userName: "Tatjana Rov" },
    { id: "asdf89009b3KJ", userName: "Oksana" },
  ],
  status: null,
  error: null,
};

export const createNewUser = createAsyncThunk(
  "users/createNewUser",
  async (data, { rejectWithValue, fulfillWithValue }) => {
    console.log(data);
    const { email, password, username } = data;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: username,
      });
      return fulfillWithValue("Ваш аккаунт створено. Здійсніть вхід!");
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
// export const getUser = createAsyncThunk(
//   "users/getUser",
//   async (data, { rejectWithValue, fulfillWithValue }) => {
//     const dbRef = ref(getDatabase());
//     get(child(dbRef, `users/`))
//       .then((snapshot) => {
//         if (snapshot.exists()) {
//           console.table(snapshot.val());
//         } else {
//           console.log("No data available");
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }
// );

export const signInUser = createAsyncThunk(
  "users/signInUser",
  async (data, { dispatch, rejectWithValue, fulfillWithValue }) => {
    const { email, password } = data;
    try {
      const signIn = await signInWithEmailAndPassword(auth, email, password);
      const { uid, displayName, accessToken } = signIn.user;
      dispatch(setActiveUser({ uid, displayName, accessToken }));
      return fulfillWithValue("Вхід успішний!");
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setActiveUser: {
      reducer: (state, action) => {
        state.activeUser = {
          uid: action.payload.uid,
          userName: action.payload.displayName,
          accessToken: action.payload.accessToken,
        };
        state.isAuth = true;
      },
    },
    resetActiveUser: {
      reducer: (state) => {
        state.activeUser = {};
        state.isAuth = false;
      },
    },
  },
  extraReducers: {
    [createNewUser.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [createNewUser.fulfilled]: (state, action) => {
      toast.success(action.payload);
      state.status = "fulfilled";
    },
    [createNewUser.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
      toast.error(action.payload);
    },
    [signInUser.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [signInUser.fulfilled]: (state, action) => {
      toast.success(action.payload);
      state.status = "fulfilled";
    },
    [signInUser.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
      toast.error(action.payload);
    },
  },
});

export const selectAllUsers = (state) => state.users.allUsers;
export const selectActiveUser = (state) => state.users.activeUser;
export const selectLoading = (state) => state.users.status;
export const selectIsAuth = (state) => state.users.isAuth;

export const { setActiveUser, resetActiveUser } = userSlice.actions;
export default userSlice.reducer;
