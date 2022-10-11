import { configureStore } from "@reduxjs/toolkit";

import currentUserReducer from "./currentUserSlice";
import lessonReducer from "./lessonSlice";

export const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    lesson: lessonReducer,
  },
});
