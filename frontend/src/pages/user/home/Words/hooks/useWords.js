import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { authenticate } from "../../../../../helpers/auth";
import { submitAnswer } from "../../../../../helpers/api";

export const useWords = (lesson) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.currentUser);
  const { currentLesson } = useSelector((state) => state.lesson);
  const [lessonWords, setLessonWords] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentNumber, setCurrentNumber] = useState(0);

  useEffect(() => {
    if (!user.id) authenticate(navigate, dispatch);
    if (!user.id) return;

    if (!lesson) return navigate("/");

    const words = lesson.Lesson_words.map((lessonWord) => lessonWord.Word);
    setLessonWords(words);
    if (words.length) {
      setCurrentQuestion(words[0]);
      setCurrentNumber(1);
    }
  }, [navigate, dispatch, lesson, user.id]);

  const processAnswer = (question, choice) => {
    const reqBody = {
      user_id: user.id,
      word_id: question.id,
      lesson_id: currentLesson.id,
      answer: choice,
      is_correct: question.correct_answer === choice,
    };

    submitAnswer(reqBody, (data) => {});
  };

  return {
    lessonWords,
    currentQuestion,
    currentNumber,
    setCurrentQuestion,
    setCurrentNumber,
    processAnswer,
  };
};
