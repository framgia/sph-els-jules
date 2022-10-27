import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";

import userApi from "../../api/userApi";
import {
  setDirty,
  setCurrentUser,
  setUserFeed,
  setActivities,
  setFollowers,
  setFollowing,
  setLearnings,
  resetState as userReset,
} from "../../store/currentUserSlice";
import {
  getAdminLessons,
  getLessonsByUserId,
  resetState as lessonReset,
} from "../../store/lessonSlice";

const useAuth = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, dirty } = useSelector((state) => state.currentUser);

  const parseJWT = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/signup")
      return;

    let loggedInUser = localStorage.getItem("user");
    if (!loggedInUser) return navigate("/login");

    const token = localStorage.getItem("accessToken");
    const decodedJWT = parseJWT(token);

    if (decodedJWT.exp * 1000 < Date.now()) {
      message.error("Session expired. Please login again.");
      localStorage.clear();
      dispatch(userReset());
      dispatch(lessonReset());
      return navigate("/login");
    }

    loggedInUser = JSON.parse(loggedInUser);
    dispatch(setCurrentUser(loggedInUser));

    if (dirty) {
      userApi.getUserProfile({ user_id: loggedInUser.id }).then(({ data }) => {
        const { activity_logs, followers, following } = data.data;

        dispatch(setActivities(activity_logs));
        dispatch(setFollowers(followers));
        dispatch(setFollowing(following));
      });

      userApi.getLearnings({ user_id: loggedInUser.id }).then(({ data }) => {
        dispatch(setLearnings(data.data));
      });

      userApi.getUserFeed({ user_id: loggedInUser.id }).then(({ data }) => {
        dispatch(setUserFeed(data.data.activity_logs));
      });

      dispatch(
        loggedInUser.user_type === "admin"
          ? getAdminLessons()
          : getLessonsByUserId({ user_id: loggedInUser.id })
      );

      dispatch(setDirty(false));
    }
  }, [dispatch, location, navigate, dirty, user.id]);
};

export default useAuth;
