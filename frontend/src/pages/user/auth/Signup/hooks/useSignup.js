import { useNavigate } from "react-router-dom";
import { message } from "antd";

import api from "../../../../../helpers/api";

export const useSignup = () => {
  const navigate = useNavigate();

  const register = async (values) => {
    const { first_name, last_name, email, password } = values;
    const { data } = await api.post("/signup", {
      first_name,
      last_name,
      email,
      password,
    });

    const { meta } = data;

    if (meta.code === 200) {
      message.success("Account created successfully!");
      return navigate("/login");
    }

    message.error(meta.message);
  };

  return { register };
};
