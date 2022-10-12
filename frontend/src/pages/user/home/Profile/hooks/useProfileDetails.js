import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { authenticate } from "../../../../../helpers/auth";
import userApi from "../../../../../api/userApi";

export const useProfileDetails = (query) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.currentUser);

  const [selectedUser, setSelectedUser] = useState({});
  const [activities, setActivities] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [learnings, setLearnings] = useState({});
  const [displayWords, setDisplayWords] = useState(false);

  useEffect(() => {
    authenticate(navigate, dispatch);
    if (!user.id) return;
    if (user.user_type === "admin") return navigate("/admin/lessons");

    userApi.getUserById({ id: query.user_id }, (data) => {
      setSelectedUser(data.data.user);
    });

    userApi.getUserProfile(
      { user_id: query.user_id },
      (followers, following, activity_logs) => {
        setActivities(activity_logs);
        setFollowers(followers);
        setFollowing(following);
      }
    );

    userApi.getLearnings({ user_id: query.user_id }, (data) => {
      setLearnings(data.data);
    });
  }, [navigate, dispatch, query.user_id, user.id, user.user_type]);

  return {
    selectedUser,
    activities,
    followers,
    following,
    learnings,
    displayWords,
    setFollowers,
    setDisplayWords,
  };
};
