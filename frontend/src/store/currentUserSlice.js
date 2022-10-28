import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  dirty: true,
  user: { id: null, first_name: null, last_name: null, email: null },
  userFeed: [],
  activities: [],
  followers: [],
  following: [],
  learnings: { learnedLessons: 0, learnedWords: 0 },
};

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setDirty: (state, action) => {
      state.dirty = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.user = action.payload;
    },
    setUserFeed: (state, action) => {
      state.userFeed = action.payload;
    },
    setActivities: (state, action) => {
      state.activities = action.payload;
    },
    setFollowers: (state, action) => {
      state.followers = action.payload;
    },
    setFollowing: (state, action) => {
      state.following = action.payload;
    },
    setLearnings: (state, action) => {
      state.learnings = action.payload;
    },
    resetState: () => initialState,
  },
});

export const {
  setLoading,
  setDirty,
  setCurrentUser,
  setUserFeed,
  setActivities,
  setFollowers,
  setFollowing,
  setLearnings,
  resetState,
} = currentUserSlice.actions;

export default currentUserSlice.reducer;
