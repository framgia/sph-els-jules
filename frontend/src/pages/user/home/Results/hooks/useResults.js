import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { message, Tag } from "antd";

import { authenticate } from "../../../../../helpers/auth";
import resultApi from "../../../../../api/resultApi.js";

export const useResults = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.currentUser);
  const { currentLesson } = useSelector((state) => state.lesson);

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [quizItems, setQuizItems] = useState({ score: 0, itemCount: 0 });

  useEffect(() => {
    if (!user.id) authenticate(navigate, dispatch);
    if (!user.id) return;
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
  }, [navigate, dispatch, user.id, currentLesson]);

  const renderColumns = () => {
    const columns = [
      {
        title: "Question",
        dataIndex: "question",
        key: "question",
      },
      {
        title: "Correct Answer",
        dataIndex: "correct_answer",
        key: "correct_answer",
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
        correct_answer: correct_answer,
        remark: correct_answer === answer,
      };
    });
    return dataSource;
  };

  return { loading, results, quizItems, renderColumns, renderData };
};