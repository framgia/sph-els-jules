import { useSelector } from "react-redux";
import { Card, Spin, Table, Tag, Typography } from "antd";

import HomeLayout from "../../../../shared/layouts/HomeLayout";

import { useResults } from "./hooks/useResults";

import styles from "./Results.module.css";

const { Text } = Typography;

const Results = () => {
  const { currentLesson } = useSelector((state) => state.lesson);

  const { loading, quizItems, renderColumns, renderData } = useResults();

  return (
    <HomeLayout pageTitle="Lesson Results">
      {loading ? (
        <Spin />
      ) : (
        <Card
          title={
            <Text strong className={styles.header}>
              {currentLesson?.title}
            </Text>
          }
          extra={
            <Text
              strong
              className={styles.header}
            >{`Score: ${quizItems.score}/${quizItems.itemCount}`}</Text>
          }
        >
          <Table
            dataSource={renderData()}
            columns={renderColumns()}
            pagination={false}
          />
        </Card>
      )}
    </HomeLayout>
  );
};

export default Results;
