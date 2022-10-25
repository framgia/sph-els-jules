import _ from "lodash";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

import adminApi from "../api/adminApi";
import lessonApi from "../api/lessonApi";
import wordApi from "../api/wordApi";

// Admin
export const getAdminLessons = createAsyncThunk(
  "admin/lessons/getLessons",
  async (payload, thunkApi) => {
    const { data } = await adminApi.getLessons(payload);
    return data.data;
  }
);

export const getLessonWords = createAsyncThunk(
  "admin/words/getWords",
  async (lesson_id, thunkApi) => {
    const { data } = await adminApi.getWordsByLessonId({ lesson_id });
    return data.data.words;
  }
);

// User
export const getLessonsByUserId = createAsyncThunk(
  "/lesson/getLessons",
  async (payload, thunkAPI) => {
    const { data } = await lessonApi.getLessons(payload);
    return data.data;
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
  loading: false,
  lessons: null,
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
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCurrentLesson: (state, action) => {
      state.currentLesson = action.payload;
      if (!action.payload) {
        state.lessonWords = [];
        return;
      }

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
    builder.addCase(getAdminLessons.fulfilled, (state, action) => {
      state.lessons = action.payload;
    });
    builder.addCase(getLessonWords.fulfilled, (state, action) => {
      state.lessonWords = action.payload;
    });
  },
});

export const {
  setLoading,
  setCurrentLesson,
  setCurrentQuestion,
  setCurrentNumber,
  saveAnswer,
  clearAfterExam,
  resetState,
} = lessonSlice.actions;

export default lessonSlice.reducer;
