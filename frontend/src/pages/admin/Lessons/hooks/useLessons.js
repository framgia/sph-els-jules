import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";

import { getAdminLessons } from "../../../../store/lessonSlice";
import adminApi from "../../../../api/adminApi";

export const useLessons = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { lessons } = useSelector((state) => state.lesson);

  const changePage = (page, limit) => {
    dispatch(getAdminLessons({ page, limit }));
  };

  const onWordsClick = (id) => {
    navigate(`/admin/lesson/words?lesson_id=${id}`);
  };

  const onEditClick = async (id) => {
    navigate(`/admin/lesson?id=${id}`);
  };

  const onDeleteClick = async (id) => {
    const { data } = await adminApi.deleteLessonById({ id });

    if (data.meta.code === 200) {
      message.success("Lesson deleted successfully");
      dispatch(getAdminLessons());
      return;
    }
    message.error(data.meta.message);
  };

  const renderData = () => {
    const data = lessons?.lessons.map((lesson) => {
      const { id, title, description } = lesson;
      return { key: id, title, description };
    });
    return data;
  };

  return { renderData, changePage, onWordsClick, onEditClick, onDeleteClick };
};
