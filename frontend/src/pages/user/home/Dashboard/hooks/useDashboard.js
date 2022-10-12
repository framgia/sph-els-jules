import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { authenticate } from "../../../../../helpers/auth";

export const useDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector((state) => state.currentUser);
  const [displayWords, setDisplayWords] = useState(false);

  useEffect(() => {
    authenticate(navigate, dispatch);
    if (!user.id) return;

    setDisplayWords(location.state?.displayWords);
  }, [navigate, dispatch, location, user.id]);

  return { displayWords, setDisplayWords };
};
