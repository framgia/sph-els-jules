import { useSelector } from "react-redux";
import { Card, Col, Row, Spin, Typography } from "antd";

import ChoiceButton from "./components/ChoiceButton";
import HomeLayout from "../../../../shared/layouts/HomeLayout";

import { useWords } from "./hooks/useWords";

import styles from "./Words.module.css";

const { Text } = Typography;

const Words = () => {
  const { currentLesson, lessonWords, currentQuestion, currentNumber } =
    useSelector((state) => state.lesson);
  const { loading } = useWords();

  return (
    <HomeLayout pageTitle="Lesson Quiz">
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
            >{`${currentNumber} of ${lessonWords.length}`}</Text>
          }
        >
          <div style={{ paddingInline: "2em" }}>
            <Text className={`center ${styles.question}`} strong>
              {currentQuestion?.question}
            </Text>
            <Row gutter={[15, 15]} style={{ marginTop: "1em" }}>
              <Col span={12}>
                <ChoiceButton choice={currentQuestion?.choice1} />
              </Col>
              <Col span={12}>
                <ChoiceButton choice={currentQuestion?.choice2} />
              </Col>
              <Col span={12}>
                <ChoiceButton choice={currentQuestion?.choice3} />
              </Col>
              <Col span={12}>
                <ChoiceButton choice={currentQuestion?.choice4} />
              </Col>
            </Row>
          </div>
        </Card>
      )}
    </HomeLayout>
  );
};

export default Words;
