import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";

import { authenticate } from "../../../../helpers/auth";
import { setCurrentLesson } from "../../../../store/lessonSlice";
import adminApi from "../../../../api/adminApi";

export const useLessonDetails = (lessonId) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.currentUser);
  const { currentLesson } = useSelector((state) => state.lesson);

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
    if (lessonId) getLessonDetails();

    return () => {
      dispatch(setCurrentLesson(null));
    };
  }, [navigate, dispatch, lessonId, user.id]);

  const onSubmit = async (reqBody, newLesson) => {
    let data;
    if (newLesson) {
      data = await adminApi.createLesson(reqBody);
    } else {
      data = await adminApi.updateLessonById({ id: currentLesson.id }, reqBody);
    }

    const { data: newData } = data;

    if (newData.meta.code === 200) {
      message.success(
        `Lesson ${newLesson ? "created" : "updated"} successfully`
      );
      return navigate("/admin/lessons");
    }

    message.error(newData.meta.message);
  };

  return { loading, onSubmit };
};