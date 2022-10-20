import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

import authApi from "../../../../api/authApi";

export const useSignup = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const userSignup = async (values) => {
    const { first_name, last_name, email, password } = values;
    setLoading(true);
    const { data } = await authApi.signup({
      first_name,
      last_name,
      email,
      password,
    });
    setLoading(false);
    const { meta } = data;
    if (meta.code === 200) {
      message.success("Account created successfully!");
      return navigate("/login");
    }

    message.error(meta.message);
  };

  return { loading, userSignup };
};
