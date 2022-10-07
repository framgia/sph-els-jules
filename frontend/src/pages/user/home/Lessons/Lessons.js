import { Button, Card, Col, Row, Typography } from "antd";

import HomeLayout from "../../../../shared/layouts/HomeLayout";

import { useLessons } from "./hooks/useLessons";

import styles from "./Lessons.module.css";

const { Text } = Typography;

const Lessons = () => {
  const { lessons, hasTaken, startQuiz, viewResult } = useLessons();

  return (
    <HomeLayout pageTitle="Lessons">
      <Row gutter={[32, 32]}>
        {lessons.map((lesson) => {
          const quizDone = hasTaken(lesson);
          return (
            <Col key={lesson.id} span={12}>
              <Card
                title={
                  <Text style={{ fontSize: "1.3rem" }} strong>
                    {lesson.title}
                  </Text>
                }
                extra={
                  <Button
                    size="large"
                    shape="round"
                    type="primary"
                    className={quizDone && styles.greenBtn}
                    onClick={() => {
                      quizDone ? viewResult(lesson) : startQuiz(lesson);
                    }}
                  >
                    {!quizDone ? "Start" : "View Result"}
                  </Button>
                }
              >
                {lesson.description}
              </Card>
            </Col>
          );
        })}
      </Row>
    </HomeLayout>
  );
};

export default Lessons;
