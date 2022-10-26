import { useSelector } from "react-redux";
import { Button, Card, Col, Pagination, Row, Typography } from "antd";

import HomeLayout from "../../../../shared/layouts/HomeLayout";

import { useLessons } from "./hooks/useLessons";

const { Text } = Typography;

const Lessons = () => {
  const { lessons } = useSelector((state) => state.lesson);
  const { changePage, hasTaken, startQuiz, viewResult } = useLessons();

  return (
    <HomeLayout pageTitle="Lessons">
      <Row gutter={[32, 32]} className="mb-6">
        {lessons?.lessons.map((lesson) => {
          const quizDone = hasTaken(lesson);
          return (
            <Col key={lesson.id} md={12} sm={24}>
              <Card
                bodyStyle={{ height: "10rem", overflow: "auto" }}
                title={
                  <Text className=" text-xl" strong>
                    {lesson.title}
                  </Text>
                }
                extra={
                  <Button
                    disabled={lesson.Lesson_words.length === 0}
                    size="large"
                    shape="round"
                    type="primary"
                    className={
                      quizDone
                        ? "border-none bg-[#389E0D]"
                        : "bg-[theme(colors.primary)]"
                    }
                    onClick={() => startQuiz(lesson)}
                  >
                    {!quizDone ? "Start" : "Retake"}
                  </Button>
                }
                actions={[
                  <Button
                    type="default"
                    disabled={!quizDone}
                    onClick={() => {
                      viewResult(lesson);
                    }}
                  >
                    View Result
                  </Button>,
                ]}
              >
                {lesson.description}
              </Card>
            </Col>
          );
        })}
      </Row>
      <Pagination
        showSizeChanger
        pageSizeOptions={[5, 10, 20, 50]}
        total={lessons?.count}
        current={lessons?.page}
        pageSize={lessons?.limit || 5}
        onChange={(page, pageSize) => {
          changePage(page, pageSize);
        }}
        showTotal={(total, range) => {
          return `${range[0]}-${range[1]} of ${total} items`;
        }}
      />
    </HomeLayout>
  );
};

export default Lessons;
