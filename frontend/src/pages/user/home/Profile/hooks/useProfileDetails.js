import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { authenticate } from "../../../../../helpers/auth";
import { getUserProfile, getLearnings } from "../../../../../helpers/api";

export const useProfileDetails = (query) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.currentUser);

  const [activities, setActivities] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [learnings, setLearnings] = useState({});
  const [displayWords, setDisplayWords] = useState(false);

  useEffect(() => {
    authenticate(navigate, dispatch);
    if (!user.id) return;

    getUserProfile(query.user_id, (followers, following, activity_logs) => {
      setActivities(activity_logs);
      setFollowers(followers);
      setFollowing(following);
    });

    getLearnings(query.user_id, (data) => {
      setLearnings(data);
    });
  }, [navigate, dispatch, query.user_id, user.id]);

  return {
    activities,
    followers,
    following,
    learnings,
    displayWords,
    setFollowers,
    setDisplayWords,
  };
};
