import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { setLoading } from "../../../../../store/currentUserSlice";
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
    if (user.user_type === "admin") return navigate("/admin/lessons");
    dispatch(setLoading(true));
    userApi.getUserById({ id: query.user_id }, (data) => {
      setSelectedUser(data.data.user);
    });

    userApi.getUserProfile({ user_id: query.user_id }).then(({ data }) => {
      const { activity_logs, followers, following } = data.data;

      setActivities(activity_logs);
      setFollowers(followers);
      setFollowing(following);
    });

    userApi.getLearnings({ user_id: query.user_id }).then(({ data }) => {
      setLearnings(data.data);
      dispatch(setLoading(false));
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
