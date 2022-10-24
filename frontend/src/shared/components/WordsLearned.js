import { Card, Empty, PageHeader, Table, Typography } from "antd";

import { useWordsLearned } from "../hooks/useWordsLearned";

const { Text } = Typography;

const WordsLearned = ({ userId, setDisplayWords }) => {
  const { wordsLearned } = useWordsLearned(userId, setDisplayWords);

  const columns = [
    {
      title: "Question",
      dataIndex: "question",
      key: "question",
    },
    {
      title: "Answer",
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
          className="p-0"
          onBack={() => setDisplayWords(false)}
          title={
            <Text className="text-2xl" strong>
              Words Learned
            </Text>
          }
        />
      }
      className="h-[min(60vh,800px)] overflow-auto"
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
