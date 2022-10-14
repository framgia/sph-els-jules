import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";

import { authenticate } from "../../../../helpers/auth";
import {
  setCurrentLesson,
  getLessonWords,
} from "../../../../store/lessonSlice";

import adminApi from "../../../../api/adminApi";

export const useWords = (lessonId) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.currentUser);
  const { currentLesson, lessonWords } = useSelector((state) => state.lesson);

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

  const onEditClick = async (id) => {
    navigate(`/admin/lesson/word?lesson_id=${currentLesson?.id}&word_id=${id}`);
  };

  const onDeleteClick = async (id) => {
    const { data } = await adminApi.deleteWordById({ id });

    if (data.meta.code === 200) {
      message.success("Word deleted successfully");
      dispatch(getLessonWords(currentLesson.id));
      return;
    }
    message.error(data.meta.message);
  };

  const renderData = () => {
    const data = lessonWords.map((lesson) => {
      const { id, question } = lesson;
      return { key: id, word: question };
    });
    return data;
  };

  return { loading, onEditClick, onDeleteClick, renderData };
};
