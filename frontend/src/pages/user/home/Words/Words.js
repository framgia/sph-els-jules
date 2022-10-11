import { useSelector } from "react-redux";
import { Button, Card, Col, Row, Spin, Typography } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

import ChoiceButton from "./components/ChoiceButton";
import HomeLayout from "../../../../shared/layouts/HomeLayout";

import { useWords } from "./hooks/useWords";

import styles from "./Words.module.css";

const { Text } = Typography;

const Words = () => {
  const { currentLesson, lessonWords, currentQuestion, currentNumber } =
    useSelector((state) => state.lesson);
  const { loading, onPrevious, onNext, onSubmit } = useWords();

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
          actions={[
            <Button
              disabled={currentNumber === 1}
              onClick={onPrevious}
              icon={<ArrowLeftOutlined />}
              type="text"
            >
              Previous Question
            </Button>,
            <Button
              onClick={currentNumber >= lessonWords.length ? onSubmit : onNext}
              icon={
                <Text>
                  {currentNumber >= lessonWords.length
                    ? "Submit Answers"
                    : "Next Question"}
                </Text>
              }
              type="text"
            >
              <ArrowRightOutlined />
            </Button>,
          ]}
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
