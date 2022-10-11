import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "./features/postsSlice";
import userSlice from "./features/userSlice";

export const store = configureStore({
  reducer: {
    posts: postsSlice,
    users: userSlice,
  },
});
