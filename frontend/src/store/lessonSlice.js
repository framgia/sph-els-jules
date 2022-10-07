import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentLesson: null,
};

export const lessonSlice = createSlice({
  name: "lesson",
  initialState,
  reducers: {
    setCurrentLesson: (state, action) => {
      state.currentLesson = action.payload;
    },
  },
});

export const { setCurrentLesson } = lessonSlice.actions;

export default lessonSlice.reducer;
