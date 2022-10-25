import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

import authApi from "../../../../api/authApi";
import { setLoading } from "../../../../store/currentUserSlice";

export const useSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userSignup = async (values) => {
    const { first_name, last_name, email, password } = values;
    dispatch(setLoading(true));
    const { data } = await authApi.signup({
      first_name,
      last_name,
      email,
      password,
    });
    dispatch(setLoading(false));
    const { meta } = data;
    if (meta.code === 200) {
      message.success("Account created successfully!");
      return navigate("/login");
    }

    message.error(meta.message);
  };

  return { userSignup };
};
