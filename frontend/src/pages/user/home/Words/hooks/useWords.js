import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "antd";

import { authenticate } from "../../../../../helpers/auth";
import {
  setCurrentQuestion,
  setCurrentNumber,
  clearAfterExam,
  submitAnswer,
  getLessonsByUserId,
} from "../../../../../store/lessonSlice";
import { message } from "antd";

export const useWords = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.currentUser);
  const { currentLesson, lessonWords, currentNumber, currentAnswers } =
    useSelector((state) => state.lesson);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!currentLesson) return navigate("/");

    authenticate(navigate, dispatch);
    if (!user.id) return;

    setLoading(true);
    if (lessonWords.length) {
      dispatch(setCurrentQuestion(lessonWords[0]));
      dispatch(setCurrentNumber(1));
    }
    setLoading(false);
  }, [navigate, dispatch, currentLesson, lessonWords, user.id]);

  const onPrevious = () => {
    dispatch(setCurrentQuestion(lessonWords[currentNumber - 2]));
    dispatch(setCurrentNumber(currentNumber - 1));
  };

  const onNext = () => {
    dispatch(setCurrentQuestion(lessonWords[currentNumber]));
    dispatch(setCurrentNumber(currentNumber + 1));
  };

  const onSubmit = async () => {
    if (currentAnswers.length !== lessonWords.length) {
      Modal.error({
        title: "Please answer all questions!",
        content:
          "The quiz cannot be submitted unless all questions are answered",
      });
      return;
    }
    const data = await dispatch(submitAnswer(currentAnswers)).unwrap();

    if (data.meta.code === 200) {
      message.success("All answers are submitted");
      dispatch(getLessonsByUserId(user.id));
      dispatch(clearAfterExam());
      navigate("/results");
      return;
    }
    message.error(data.meta.message);
  };

  return {
    loading,
    onPrevious,
    onNext,
    onSubmit,
  };
};
