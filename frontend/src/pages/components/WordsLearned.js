import React, { useState, useEffect } from "react";

import { Card, Typography, PageHeader, Empty, Table, message } from "antd";

import api from "../../helpers/api";

const { Text } = Typography;

const WordsLearned = ({ user_id, setDisplayWords }) => {
  const [wordsLearned, setWordsLearned] = useState([]);

  useEffect(() => {
    const getWordsLearned = async () => {
      const { data } = await api.get("/words/user", {
        params: {
          user_id,
        },
      });

      const { meta, data: newData } = data;
      if (meta.code === 200) return setWordsLearned(newData.words_learned);

      message.error(meta.message);
    };
    if (user_id) getWordsLearned();
  }, [user_id]);

  const columns = [
    {
      title: "Questions",
      dataIndex: "question",
      key: "question",
    },
    {
      title: "Answers",
      dataIndex: "answer",
      key: "answer",
    },
  ];

  const dataSource = wordsLearned.map((wl) => {
    const { id, question, correct_answer } = wl;

    return {
      key: id,
      question,
      answer: correct_answer,
    };
  });

  return (
    <Card
      title={
        <PageHeader
          style={{ padding: "0" }}
          onBack={() => setDisplayWords(false)}
          title={
            <Text style={{ fontSize: "24px" }} strong>
              Words Learned
            </Text>
          }
        />
      }
      style={{ height: "min(60vh, 800px)", overflow: "auto" }}
    >
      {wordsLearned.length > 0 ? (
        <Table dataSource={dataSource} columns={columns} pagination={false} />
      ) : (
        <Empty />
      )}
    </Card>
  );
};

export default WordsLearned;
