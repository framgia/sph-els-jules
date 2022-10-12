import _ from "lodash";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

import lessonApi from "../api/lessonApi";
import wordApi from "../api/wordApi";

export const getLessonsByUserId = createAsyncThunk(
  "/lesson/getLessons",
  async (user_id, thunkAPI) => {
    const { data } = await lessonApi.getLessons({ user_id });
    return data.data.lessons;
  }
);

export const submitAnswer = createAsyncThunk(
  "/lesson/postAnswer",
  async (body, thunkAPI) => {
    const { data } = await wordApi.postAnswer(body);
    return data;
  }
);

const initialState = {
  lessons: [],
  currentLesson: null,
  lessonWords: [],
  currentQuestion: null,
  currentNumber: 0,
  currentAnswers: [],
};

export const lessonSlice = createSlice({
  name: "lesson",
  initialState,
  reducers: {
    setLessons: (state, action) => {
      state.lessons = action.payload;
    },
    setCurrentLesson: (state, action) => {
      state.currentLesson = action.payload;

      const lessonWords = action.payload.Lesson_words.map((word) => word.Word);
      state.lessonWords = _.shuffle(lessonWords);
    },
    setCurrentQuestion: (state, action) => {
      state.currentQuestion = action.payload;
    },
    setCurrentNumber: (state, action) => {
      state.currentNumber = action.payload;
    },
    saveAnswer: (state, action) => {
      const { word_id } = action.payload;
      let answerIndex = current(state.currentAnswers).findIndex(
        (answer) => answer.word_id === word_id
      );

      if (answerIndex !== -1) {
        state.currentAnswers[answerIndex] = action.payload;
        return;
      }
      state.currentAnswers.push(action.payload);
    },
    clearAfterExam: (state) => {
      state.currentQuestion = null;
      state.currentNumber = 0;
      state.currentAnswers = [];
    },

    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getLessonsByUserId.fulfilled, (state, action) => {
      state.lessons = action.payload;
    });
    builder.addCase(submitAnswer.fulfilled, (action, state) => {});
  },
});

export const {
  setLessons,
  setCurrentLesson,
  setCurrentQuestion,
  setCurrentNumber,
  saveAnswer,
  clearAfterExam,
  resetState,
} = lessonSlice.actions;

export default lessonSlice.reducer;
