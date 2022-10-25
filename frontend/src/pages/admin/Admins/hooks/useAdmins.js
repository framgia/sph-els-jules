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
  const [adminsMeta, setAdminsMeta] = useState(null);
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    authenticate(navigate, dispatch);
    if (!user.id) return;

    dispatch(setLoading(true));
    adminApi.getAdmins({}).then(({ data }) => {
      if (data.meta.code === 200) {
        const { admins, page, limit, count } = data.data;
        setFilteredAdmins(admins);
        setAdmins(admins);
        setAdminsMeta({ page, limit, count });
      } else message.error(data.meta.message);

      dispatch(setLoading(false));
    });
  }, [navigate, dispatch, user.id]);

  const changePage = async (page, limit) => {
    dispatch(setLoading(true));
    const { data } = await adminApi.getAdmins({ page, limit });

    if (data.meta.code === 200) {
      const { admins, page, limit, count } = data.data;
      setFilteredAdmins(admins);
      setAdmins(admins);
      setAdminsMeta({ page, limit, count });
    } else message.error(data.meta.message);

    dispatch(setLoading(false));
  };

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
    adminsMeta,
    filteredAdmins,
    searchText,
    changePage,
    setSearchText,
    filterUsers,
  };
};
