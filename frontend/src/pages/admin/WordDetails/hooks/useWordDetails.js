import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";

import { setLoading, setCurrentLesson } from "../../../../store/lessonSlice";
import adminApi from "../../../../api/adminApi";

export const useWordDetails = (lessonId, wordId) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.currentUser);
  const { currentLesson } = useSelector((state) => state.lesson);

  const [currentWord, setCurrentWord] = useState(null);

  useEffect(() => {
    const getWordDetails = async () => {
      const { data } = await adminApi.getWordById({ id: wordId });

      if (data.meta.code === 200) {
        setCurrentWord(data.data.word);
        dispatch(setLoading(false));
        return;
      }
      message.error(data.meta.message);
    };

    const getLessonDetails = async () => {
      dispatch(setLoading(true));
      const { data } = await adminApi.getLessonById({ id: lessonId });

      if (data.meta.code === 200) {
        dispatch(setCurrentLesson(data.data.lesson));
        wordId ? await getWordDetails() : dispatch(setLoading(false));
        return;
      }
      message.error(data.meta.message);
    };

    getLessonDetails();
  }, [navigate, dispatch, lessonId, wordId, user.id]);

  const onSubmit = async (reqBody, newWord) => {
    let data;
    if (newWord) {
      data = await adminApi.createWordByLessonId(
        { lesson_id: currentLesson.id },
        reqBody
      );
    } else {
      data = await adminApi.updateWordById({ id: currentWord.id }, reqBody);
    }

    const { data: newData } = data;

    if (newData.meta.code === 200) {
      message.success(`Word ${newWord ? "created" : "updated"} successfully`);
      return navigate(`/admin/lesson/words?lesson_id=${currentLesson.id}}`);
    }

    message.error(newData.meta.message);
  };

  return { currentWord, onSubmit };
};
