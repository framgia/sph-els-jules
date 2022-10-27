import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getLessonsByUserId,
  setCurrentLesson,
} from "../../../../../store/lessonSlice";

export const useLessons = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.currentUser);

  useEffect(() => {
    if (user.user_type === "admin") return navigate("/admin/lessons");
  }, [navigate, dispatch, user.id, user.user_type]);

  const changePage = (page, limit) => {
    dispatch(getLessonsByUserId({ user_id: user.id, page, limit }));
  };

  const startQuiz = (lesson) => {
    dispatch(setCurrentLesson(lesson));
    navigate("/words");
  };

  const viewResult = (lesson) => {
    dispatch(setCurrentLesson(lesson));
    navigate("/results");
  };

  const hasTaken = (lesson) => {
    return lesson.result.length > 0;
  };

  return { changePage, hasTaken, startQuiz, viewResult };
};
