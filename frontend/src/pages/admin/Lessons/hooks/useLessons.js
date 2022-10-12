import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { authenticate } from "../../../../helpers/auth";

export const useLessons = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.currentUser);
  const { lessons } = useSelector((state) => state.lesson);

  useEffect(() => {
    authenticate(navigate, dispatch);
    if (!user.id) return;
  }, [navigate, dispatch, user.id]);

  const renderData = () => {
    const data = lessons.map((lesson) => {
      const { id, title, description } = lesson;
      return { key: id, title, description };
    });
    return data;
  };

  return { renderData };
};
