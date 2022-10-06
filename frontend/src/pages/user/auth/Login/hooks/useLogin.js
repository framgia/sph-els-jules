import { useNavigate } from "react-router-dom";
import { message } from "antd";

import api from "../../../../../helpers/api";

export const useLogin = () => {
  const navigate = useNavigate();

  const login = async (values) => {
    const { email, password } = values;
    const { data } = await api.post("/login", { email, password });

    if (data.meta.code === 200) {
      const { data: userData } = data;
      const { user } = userData;

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          user_type: user.user_type,
          avatar_url: user.avatar_url,
        })
      );

      return navigate("/");
    }

    message.error(data.meta.message);
  };

  return { login };
};
