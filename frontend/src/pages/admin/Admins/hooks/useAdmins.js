import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";

import { authenticate } from "../../../../helpers/auth";
import { setLoading } from "../../../../store/currentUserSlice";
import adminApi from "../../../../api/adminApi";

export const useAdmins = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.currentUser);

  const [admins, setAdmins] = useState([]);
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    authenticate(navigate, dispatch);
    if (!user.id) return;

    const getAdmins = async () => {
      dispatch(setLoading(true));
      const { data } = await adminApi.getAdmins();

      if (data.meta.code === 200) {
        setFilteredAdmins(data.data.admins);
        setAdmins(data.data.admins);
        dispatch(setLoading(false));
        return;
      }

      message.error(data.meta.message);
    };
    getAdmins();
  }, [navigate, dispatch, user.id]);

  const filterUsers = (value) => {
    const filtered = admins.filter(
      (admin) =>
        admin.first_name.includes(value) ||
        admin.last_name.includes(value) ||
        admin.email.includes(value)
    );
    setFilteredAdmins(filtered);
  };

  return {
    filteredAdmins,
    searchText,
    setSearchText,
    filterUsers,
  };
};
