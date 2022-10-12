import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { message, Tag } from "antd";

import resultApi from "../../../../../api/resultApi.js";
import { authenticate } from "../../../../../helpers/auth";
import { setCurrentLesson } from "../../../../../store/lessonSlice";

export const useResults = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.currentUser);
  const { lessons, currentLesson } = useSelector((state) => state.lesson);

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [quizItems, setQuizItems] = useState({ score: 0, itemCount: 0 });

  useEffect(() => {
    if (!user.id) authenticate(navigate, dispatch);
    if (!user.id) return;
    if (user.user_type === "admin") return navigate("/admin/lessons");
    if (!currentLesson) return navigate("/lessons");

    setLoading(true);
    resultApi.getResults(
      { user_id: user.id, lesson_id: currentLesson.id },
      (data) => {
        if (data.meta.code === 200) {
          const { data: newData } = data;
          setResults(newData.results);
          setQuizItems({ score: newData.score, itemCount: newData.item_count });
          return;
        }
        message.error(data.meta.message);
      }
    );

    setLoading(false);
  }, [navigate, dispatch, user.id, user.user_type, currentLesson]);

  const retryLesson = () => {
    dispatch(setCurrentLesson(currentLesson));
    navigate("/words");
  };

  const getNextLesson = () => {
    return lessons[currentLesson?.id % lessons.length];
  };

  const toNextLesson = () => {
    dispatch(setCurrentLesson(getNextLesson()));
    navigate("/words");
  };

  const renderColumns = () => {
    const columns = [
      {
        title: "Question",
        dataIndex: "question",
        key: "question",
      },
      {
        title: "Your Answer",
        dataIndex: "answer",
        key: "answer",
      },
      {
        title: "Remark",
        dataIndex: "remark",
        key: "remark",
        render: (remark) => {
          return (
            <Tag color={remark ? "green" : "red"}>
              {remark ? "CORRECT" : "INCORRECT"}
            </Tag>
          );
        },
      },
    ];
    return columns;
  };

  const renderData = () => {
    const dataSource = results.map((result) => {
      const { id, answer, Word } = result;
      const { question, correct_answer } = Word;

      return {
        key: id,
        question,
        answer,
        remark: correct_answer === answer,
      };
    });
    return dataSource;
  };

  return {
    loading,
    results,
    quizItems,
    renderColumns,
    renderData,
    retryLesson,
    getNextLesson,
    toNextLesson,
  };
};
