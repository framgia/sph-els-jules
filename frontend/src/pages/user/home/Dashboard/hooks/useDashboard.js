import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { authenticate } from "../../../../../helpers/auth";

export const useDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [displayWords, setDisplayWords] = useState(false);

  useEffect(() => {
    authenticate(navigate, dispatch);
  }, [navigate, dispatch]);

  return { displayWords, setDisplayWords };
};
