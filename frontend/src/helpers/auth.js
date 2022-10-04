import {
  setCurrentUser,
  setUserFeed,
  setActivities,
  setFollowers,
  setFollowing,
  setLearnings,
} from "../store/currentUserSlice";
import { getUserFeed, getUserProfile, getLearnings } from "../helpers/api";

export const authenticate = async (navigate, dispatch) => {
  let loggedInUser = localStorage.getItem("user");
  if (!loggedInUser) {
    return navigate("/login");
  }

  loggedInUser = JSON.parse(loggedInUser);
  dispatch(setCurrentUser(loggedInUser));

  await getUserProfile(loggedInUser.id, (followers, following, activities) => {
    dispatch(setActivities(activities));
    dispatch(setFollowers(followers));
    dispatch(setFollowing(following));
  });

  await getLearnings(loggedInUser.id, (learnings) => {
    dispatch(setLearnings(learnings));
  });
  await getUserFeed(loggedInUser.id, (userFeed) => {
    dispatch(setUserFeed(userFeed));
  });
};
