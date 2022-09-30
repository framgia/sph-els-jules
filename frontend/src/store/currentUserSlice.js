import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: { id: null, first_name: null, last_name: null, email: null },
};

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setCurrentUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;
