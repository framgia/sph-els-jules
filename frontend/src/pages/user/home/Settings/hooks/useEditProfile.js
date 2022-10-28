import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";

import userApi from "../../../../../api/userApi";
import {
  setLoading,
  setCurrentUser,
} from "../../../../../store/currentUserSlice";

export const useEditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.currentUser);

  const [avatarUrl, setAvatarUrl] = useState(undefined);
  const [selectedImg, setSelectedImg] = useState("");

  useEffect(() => {
    if (user.user_type === "admin") return navigate("/admin/lessons");

    setSelectedImg(user.avatar_url);
  }, [dispatch, navigate, user.id, user.avatar_url, user.user_type]);

  const saveProfile = async (values) => {
    dispatch(setLoading(true));
    const { first_name, last_name, email, current_password, new_password } =
      values;

    const reqBody = {};
    if (first_name !== user.first_name) reqBody.first_name = first_name;
    if (last_name !== user.last_name) reqBody.last_name = last_name;
    if (email !== user.email) reqBody.email = email;
    if (current_password) reqBody.current_password = current_password;
    if (new_password) reqBody.new_password = new_password;
    if (avatarUrl && avatarUrl !== user.avatar_url)
      reqBody.avatar_url = avatarUrl;

    if (!Object.values(reqBody).some((value) => value !== undefined)) {
      return message.error("Profile not updated. No changes made.");
    }
    const data = await userApi.editUserProfile({
      user_id: user.id,
      ...reqBody,
    });
    dispatch(setLoading(false));
    if (data.meta.code === 200) {
      message.success("Profile successfully updated!");
      localStorage.setItem("user", JSON.stringify(data.data.user));
      return dispatch(setCurrentUser(data.data.user));
    }

    message.error(data.meta.message);
  };

  return {
    avatarUrl,
    selectedImg,
    setAvatarUrl,
    setSelectedImg,
    saveProfile,
  };
};
