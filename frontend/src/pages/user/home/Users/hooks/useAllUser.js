import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";

import { authenticate } from "../../../../../helpers/auth";
import { getUsers, toggleFollow } from "../../../../../helpers/api";
import {
  addUserFeed,
  addActivity,
  updateFollowing,
} from "../../../../../store/currentUserSlice";

export const useAllUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, following } = useSelector((state) => state.currentUser);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (!user.id) authenticate(navigate, dispatch);
    if (!user.id) return;

    getUsers((data) => {
      if (data.meta.code === 200) {
        setFilteredUsers(data.data.users);
        return setUsers(data.data.users);
      }
      message.error(data.meta.message);
    });
  }, [navigate, dispatch, user.id]);

  const filterUsers = (value) => {
    const filtered = users.filter(
      (user) =>
        user.first_name.includes(value) ||
        user.last_name.includes(value) ||
        user.email.includes(value)
    );
    setFilteredUsers(filtered);
  };

  const isFollowed = (followingId) => {
    const findUser = following.find(
      (user) => user.user_id === followingId && user.is_followed
    );

    return findUser;
  };

  const handleFollow = async (user_id) => {
    const data = await toggleFollow(user.id, user_id);

    const {
      data: { activity_log, user_follow },
    } = data;

    if (data.meta.code === 200) {
      dispatch(addUserFeed(activity_log));
      dispatch(addActivity(activity_log));
      dispatch(updateFollowing(user_follow));
      return;
    }

    message.error(data.meta.message);
  };

  return {
    users,
    filteredUsers,
    searchText,
    setSearchText,
    filterUsers,
    isFollowed,
    handleFollow,
  };
};
