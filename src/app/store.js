import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "./features/posts/postsSlice";
import userSlice from "./features/posts/userSlice";

export const store = configureStore({
  reducer: {
    posts: postsSlice,
    users: userSlice,
  },
});
