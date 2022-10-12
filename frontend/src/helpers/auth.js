import {
  setCurrentUser,
  setUserFeed,
  setActivities,
  setFollowers,
  setFollowing,
  setLearnings,
} from "../store/currentUserSlice";
import { getAdminLessons, getLessonsByUserId } from "../store/lessonSlice";
import userApi from "../api/userApi";

export const authenticate = async (navigate, dispatch) => {
  let loggedInUser = localStorage.getItem("user");
  if (!loggedInUser) {
    return navigate("/login");
  }

  loggedInUser = JSON.parse(loggedInUser);
  dispatch(setCurrentUser(loggedInUser));

  await userApi.getUserProfile(
    { user_id: loggedInUser.id },
    (followers, following, activities) => {
      dispatch(setActivities(activities));
      dispatch(setFollowers(followers));
      dispatch(setFollowing(following));
    }
  );

  await userApi.getLearnings({ user_id: loggedInUser.id }, (learnings) => {
    dispatch(setLearnings(learnings.data));
  });
  await userApi.getUserFeed({ user_id: loggedInUser.id }, (userFeed) => {
    dispatch(setUserFeed(userFeed.data.activity_logs));
  });

  dispatch(
    loggedInUser.user_type === "admin"
      ? getAdminLessons()
      : getLessonsByUserId(loggedInUser.id)
  );
};
