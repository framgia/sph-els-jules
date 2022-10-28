import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { message } from "antd";

import userApi from "../../../../../api/userApi";
import { setDirty } from "../../../../../store/currentUserSlice";

export const useFollow = (query, setFollowers) => {
  const dispatch = useDispatch();
  const { following } = useSelector((state) => state.currentUser);

  const [followLoading, setFollowLoading] = useState(false);
  const [followModal, setFollowModal] = useState({
    name: "",
    show: false,
  });

  const isFollowed = (followingId) => {
    const findUser = following.find(
      (user) => user.user_id === followingId && user.is_followed
    );

    return findUser;
  };

  const handleFollow = async () => {
    setFollowLoading(true);
    const data = await userApi.toggleFollow({
      following_id: +query.user_id,
    });

    if (data.meta.code === 200) {
      dispatch(setDirty(true));
      const { data } = await userApi.getUserProfile({ user_id: query.user_id });
      setFollowers(data.data.followers);
    } else message.error(data.meta.message);
    setFollowLoading(false);
  };

  return {
    followLoading,
    followModal,
    setFollowModal,
    isFollowed,
    handleFollow,
  };
};
