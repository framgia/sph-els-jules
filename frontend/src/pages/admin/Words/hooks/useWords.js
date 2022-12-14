import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";

import {
  setLoading,
  setCurrentLesson,
  getLessonWords,
} from "../../../../store/lessonSlice";

import adminApi from "../../../../api/adminApi";

export const useWords = (lessonId) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.currentUser);
  const { currentLesson, lessonWords } = useSelector((state) => state.lesson);

  useEffect(() => {
    const getLessonDetails = async () => {
      dispatch(setLoading(true));
      const { data } = await adminApi.getLessonById({ id: lessonId });

      if (data.meta.code === 200) {
        dispatch(setCurrentLesson(data.data.lesson));
      } else message.error(data.meta.message);

      dispatch(setLoading(false));
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

  return { onEditClick, onDeleteClick, renderData };
};
