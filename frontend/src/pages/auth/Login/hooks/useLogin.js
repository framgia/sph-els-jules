import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

import authApi from "../../../../api/authApi";

export const useLogin = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const userLogin = async (values) => {
    const { email, password } = values;
    setLoading(true);
    const { data } = await authApi.login({ email, password });

    setLoading(false);
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

      return navigate(user.user_type === "user" ? "/" : "/admin/lessons");
    }

    message.error(data.meta.message);
  };

  return { loading, userLogin };
};
