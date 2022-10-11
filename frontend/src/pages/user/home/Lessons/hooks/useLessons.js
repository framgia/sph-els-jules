import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { authenticate } from "../../../../../helpers/auth";
import { setCurrentLesson } from "../../../../../store/lessonSlice";

export const useLessons = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.currentUser);

  useEffect(() => {
    if (!user.id) authenticate(navigate, dispatch);
    if (!user.id) return;
  }, [navigate, dispatch, user.id]);

  const startQuiz = (lesson) => {
    dispatch(setCurrentLesson(lesson));
    navigate(`/words?lesson_id=${lesson.id}`);
  };

  const viewResult = (lesson) => {};

  const hasTaken = (lesson) => {
    return lesson.result.length > 0;
  };

  return { hasTaken, startQuiz, viewResult };
};
