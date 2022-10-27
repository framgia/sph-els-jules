import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

import authApi from "../../../../api/authApi";
import { setLoading } from "../../../../store/currentUserSlice";

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = async (values) => {
    const { email, password } = values;
    dispatch(setLoading(true));
    const { data } = await authApi.login({ email, password });

    dispatch(setLoading(false));
    if (data.meta.code === 200) {
      const { data: userData } = data;
      const { token, user } = userData;

      localStorage.setItem("accessToken", token);
      localStorage.setItem("user", JSON.stringify(user));

      return navigate(user.user_type === "user" ? "/" : "/admin/lessons");
    }

    message.error(data.meta.message);
  };

  return { userLogin };
};
