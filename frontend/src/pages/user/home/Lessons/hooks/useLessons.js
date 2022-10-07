import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { authenticate } from "../../../../../helpers/auth";
import { getLessons } from "../../../../../helpers/api";
import { setCurrentLesson } from "../../../../../store/lessonSlice";

export const useLessons = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.currentUser);
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    if (!user.id) authenticate(navigate, dispatch);
    if (!user.id) return;

    getLessons(user.id, (data) => {
      setLessons(data.data.lessons);
    });
  }, [navigate, dispatch, user.id]);

  const startQuiz = (lesson) => {
    dispatch(setCurrentLesson(lesson));
    navigate(`/words?lesson_id=${lesson.id}`);
  };

  const viewResult = (lesson) => {};

  const hasTaken = (lesson) => {
    return lesson.result.length > 0;
  };

  return { lessons, hasTaken, startQuiz, viewResult };
};
