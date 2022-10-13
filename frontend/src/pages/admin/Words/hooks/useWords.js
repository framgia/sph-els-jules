import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";

import { authenticate } from "../../../../helpers/auth";
import { setCurrentLesson } from "../../../../store/lessonSlice";
import adminApi from "../../../../api/adminApi";

export const useWords = (lessonId) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.currentUser);
  const { lessonWords } = useSelector((state) => state.lesson);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    authenticate(navigate, dispatch);
    if (!user.id) return;

    const getLessonDetails = async () => {
      setLoading(true);
      const { data } = await adminApi.getLessonById({ id: lessonId });

      if (data.meta.code === 200) {
        dispatch(setCurrentLesson(data.data.lesson));
        setLoading(false);
        return;
      }

      message.error(data.meta.message);
    };
    getLessonDetails();

    return () => {
      dispatch(setCurrentLesson(null));
    };
  }, [navigate, dispatch, lessonId, user.id]);

  const renderData = () => {
    const data = lessonWords.map((lesson) => {
      const { id, question } = lesson;
      return { key: id, word: question };
    });
    return data;
  };

  return { loading, renderData };
};
