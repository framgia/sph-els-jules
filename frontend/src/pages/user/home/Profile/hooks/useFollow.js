import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { message } from "antd";

import { getUserProfile, toggleFollow } from "../../../../../helpers/api";
import {
  addUserFeed,
  addActivity,
  updateFollowing,
} from "../../../../../store/currentUserSlice";

export const useFollow = (query, setFollowers) => {
  const dispatch = useDispatch();
  const { user, following } = useSelector((state) => state.currentUser);
  const [followModal, setFollowModal] = useState({
    name: "",
    show: false,
  });

  const isFollowed = (followingId) => {
    const findUser = following.find(
      (user) => user.user_id === followingId && user.is_followed
    );

    return !findUser;
  };

  const handleFollow = async () => {
    const data = await toggleFollow(user.id, +query.user_id);

    const {
      data: { activity_log, user_follow },
    } = data;

    if (data.meta.code === 200) {
      dispatch(addUserFeed(activity_log));
      dispatch(addActivity(activity_log));
      dispatch(updateFollowing(user_follow));
      await getUserProfile(
        query.user_id,
        (followers, following, activity_logs) => {
          setFollowers(followers);
        }
      );
      return;
    }

    message.error(data.meta.message);
  };

  return { followModal, setFollowModal, isFollowed, handleFollow };
};
