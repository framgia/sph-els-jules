import { configureStore } from "@reduxjs/toolkit";

import currentUserReducer from "./currentUserSlice";
import profileReducer from "./profileSlice";

export const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    profile: profileReducer,
  },
});
