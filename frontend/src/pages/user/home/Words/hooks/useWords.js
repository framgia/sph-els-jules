import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { authenticate } from "../../../../../helpers/auth";
import {
  setLessonWords,
  nextQuestion,
  nextNumber,
} from "../../../../../store/lessonSlice";

export const useWords = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.currentUser);
  const { currentLesson } = useSelector((state) => state.lesson);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user.id) authenticate(navigate, dispatch);
    if (!user.id) return;
    if (!currentLesson) return navigate("/");

    setLoading(true);
    const words = currentLesson.Lesson_words.map(
      (lessonWord) => lessonWord.Word
    );
    dispatch(setLessonWords(words));

    if (words.length) {
      dispatch(nextQuestion(words[0]));
      dispatch(nextNumber(1));
    }
    setLoading(false);
  }, [navigate, dispatch, currentLesson, user.id]);

  return {
    loading,
  };
};
