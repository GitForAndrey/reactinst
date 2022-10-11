import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeUser: { id: "sdJH879dfJKJ", userName: "Andrii Petrov" },
  allUsers: [
    { id: "sdJH879dfJKJ", userName: "Andrii" },
    { id: "sdJ56743KJ", userName: "Slava" },
    { id: "sdJfg77dfg3KJ", userName: "Ivan Sergeev" },
    { id: "23fdf6743KJ", userName: "Tatjana Rov" },
    { id: "asdf89009b3KJ", userName: "Oksana" },
  ],
};

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
});

export const selectAllUsers = (state) => state.users.allUsers;
export const selectActiveUser = (state) => state.users.activeUser;

export const {} = userSlice.actions;
export default userSlice.reducer;
