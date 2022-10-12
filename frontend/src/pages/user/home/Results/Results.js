import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Card, Spin, Table, Typography } from "antd";

import HomeLayout from "../../../../shared/layouts/HomeLayout";

import { useResults } from "./hooks/useResults";

import styles from "./Results.module.css";

const { Text } = Typography;

const Results = () => {
  const navigate = useNavigate();
  const { currentLesson } = useSelector((state) => state.lesson);

  const {
    loading,
    quizItems,
    renderColumns,
    renderData,
    retryLesson,
    getNextLesson,
    toNextLesson,
  } = useResults();

  const nextLesson = getNextLesson();

  return (
    <HomeLayout pageTitle="Lesson Results">
      {loading ? (
        <Spin />
      ) : (
        <div>
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
            actions={[
              <div className={styles.cardActions}>
                <Button
                  style={{ float: "left" }}
                  shape="round"
                  type="default"
                  onClick={retryLesson}
                >
                  Retry lesson
                </Button>
                <Button
                  shape="round"
                  type="default"
                  onClick={() => {
                    navigate("/", { state: { displayWords: true } });
                  }}
                >
                  Go to Words Learned
                </Button>
              </div>,
            ]}
          >
            <Table
              dataSource={renderData()}
              columns={renderColumns()}
              pagination={false}
            />
          </Card>
          <div className={styles.nextLesson}>
            <Text className={styles.nextLessonText}>
              Next Lesson: <Text strong>{nextLesson?.title}</Text>
            </Text>
            <Button
              className={nextLesson?.result.length > 0 && styles.greenBtn}
              type="primary"
              shape="round"
              size="large"
              onClick={toNextLesson}
            >
              {nextLesson?.result.length > 0 ? "Retake" : "Start"}
            </Button>
          </div>
        </div>
      )}
    </HomeLayout>
  );
};

export default Results;
