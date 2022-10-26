import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";

import { authenticate } from "../../../../../helpers/auth";
import userApi from "../../../../../api/userApi";
import {
  setLoading,
  addUserFeed,
  addActivity,
  updateFollowing,
} from "../../../../../store/currentUserSlice";

export const useAllUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, following } = useSelector((state) => state.currentUser);
  const [users, setUsers] = useState([]);
  const [usersMeta, setUsersMeta] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    authenticate(navigate, dispatch);
    if (!user.id) return;

    dispatch(setLoading(true));
    userApi.getUsers().then(({ data }) => {
      if (data.meta.code === 200) {
        const { users, count, page, limit } = data.data;
        setFilteredUsers(users);
        setUsers(users);
        setUsersMeta({ page, limit, count });
      } else message.error(data.meta.message);

      dispatch(setLoading(false));
    });
  }, [navigate, dispatch, user.id]);

  const changePage = async (page, limit) => {
    dispatch(setLoading(true));
    const { data } = await userApi.getUsers({ page, limit });

    if (data.meta.code === 200) {
      const { users, count, page, limit } = data.data;
      setFilteredUsers(users);
      setUsers(users);
      setUsersMeta({ page, limit, count });
    } else message.error(data.meta.message);

    dispatch(setLoading(false));
  };

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
    const data = await userApi.toggleFollow({
      following_id: user_id,
    });

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
    usersMeta,
    filteredUsers,
    searchText,
    changePage,
    setSearchText,
    filterUsers,
    isFollowed,
    handleFollow,
  };
};
