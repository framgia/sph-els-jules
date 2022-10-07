import { useSelector } from "react-redux";
import { Card, Col, Row, Typography } from "antd";

import ChoiceButton from "./components/ChoiceButton";
import HomeLayout from "../../../../shared/layouts/HomeLayout";

import { useWords } from "./hooks/useWords";

import styles from "./Words.module.css";

const { Text } = Typography;

const Words = () => {
  const { currentLesson } = useSelector((state) => state.lesson);
  const {
    lessonWords,
    currentQuestion,
    currentNumber,
    setCurrentQuestion,
    setCurrentNumber,
    processAnswer,
  } = useWords(currentLesson);

  return (
    <HomeLayout pageTitle="Lesson Quiz">
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
              <ChoiceButton
                lessonWords={lessonWords}
                question={currentQuestion}
                choice={currentQuestion?.choice1}
                currentNumber={currentNumber}
                setCurrentQuestion={setCurrentQuestion}
                setCurrentNumber={setCurrentNumber}
                processAnswer={processAnswer}
              />
            </Col>
            <Col span={12}>
              <ChoiceButton
                lessonWords={lessonWords}
                question={currentQuestion}
                choice={currentQuestion?.choice2}
                currentNumber={currentNumber}
                setCurrentQuestion={setCurrentQuestion}
                setCurrentNumber={setCurrentNumber}
                processAnswer={processAnswer}
              />
            </Col>
            <Col span={12}>
              <ChoiceButton
                lessonWords={lessonWords}
                question={currentQuestion}
                choice={currentQuestion?.choice3}
                currentNumber={currentNumber}
                setCurrentQuestion={setCurrentQuestion}
                setCurrentNumber={setCurrentNumber}
                processAnswer={processAnswer}
              />
            </Col>
            <Col span={12}>
              <ChoiceButton
                lessonWords={lessonWords}
                question={currentQuestion}
                choice={currentQuestion?.choice4}
                currentNumber={currentNumber}
                setCurrentQuestion={setCurrentQuestion}
                setCurrentNumber={setCurrentNumber}
                processAnswer={processAnswer}
              />
            </Col>
          </Row>
        </div>
      </Card>
    </HomeLayout>
  );
};

export default Words;
