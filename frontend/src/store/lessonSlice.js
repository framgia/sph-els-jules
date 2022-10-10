import { createSlice } from "@reduxjs/toolkit";

import { postAnswer } from "../helpers/api";

const initialState = {
  currentLesson: null,
  lessonWords: [],
  currentQuestion: null,
  currentNumber: 0,
};

export const lessonSlice = createSlice({
  name: "lesson",
  initialState,
  reducers: {
    setCurrentLesson: (state, action) => {
      state.currentLesson = action.payload;
    },
    setLessonWords: (state, action) => {
      state.lessonWords = action.payload;
    },
    nextQuestion: (state, action) => {
      state.currentQuestion = action.payload;
    },
    nextNumber: (state, action) => {
      state.currentNumber = action.payload;
    },
    submitAnswer: (state, action) => {
      postAnswer(action.payload);
    },
  },
});

export const {
  setCurrentLesson,
  setLessonWords,
  nextQuestion,
  nextNumber,
  submitAnswer,
} = lessonSlice.actions;

export default lessonSlice.reducer;
