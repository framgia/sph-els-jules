import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: { id: null, first_name: null, last_name: null, email: null },
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUserProfile } = profileSlice.actions;

export default profileSlice.reducer;
