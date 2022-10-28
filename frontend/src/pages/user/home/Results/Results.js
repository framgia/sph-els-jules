import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Card, Spin, Table, Typography } from "antd";

import HomeLayout from "../../../../shared/layouts/HomeLayout";

import { useResults } from "./hooks/useResults";

const { Text } = Typography;

const Results = () => {
  const navigate = useNavigate();
  const { loading, currentLesson } = useSelector((state) => state.lesson);

  const {
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
              <Text strong className="text-2xl">
                {currentLesson?.title}
              </Text>
            }
            extra={
              <Text
                strong
                className="text-2xl"
              >{`Score: ${quizItems.score}/${quizItems.itemCount}`}</Text>
            }
            actions={[
              <div className="ml-7 flex gap-2">
                <Button shape="round" type="default" onClick={retryLesson}>
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
          <div className="float-right mt-4">
            <Text className="mr-2 text-lg">
              Next Lesson: <Text strong>{nextLesson?.title}</Text>
            </Text>
            <Button
              disabled={nextLesson?.Lesson_words.length === 0}
              className={
                nextLesson?.result.length > 0
                  ? "border-none bg-[#389E0D]"
                  : "bg-[theme(colors.primary)]"
              }
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
