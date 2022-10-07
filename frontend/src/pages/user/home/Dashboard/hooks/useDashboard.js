import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { authenticate } from "../../../../../helpers/auth";

export const useDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.currentUser);
  const [displayWords, setDisplayWords] = useState(false);

  useEffect(() => {
    if (!user.id) authenticate(navigate, dispatch);
  }, [navigate, dispatch, user.id]);

  return { displayWords, setDisplayWords };
};
