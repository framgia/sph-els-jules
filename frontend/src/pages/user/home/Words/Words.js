import { useSelector } from "react-redux";
import { Button, Card, Col, Row, Spin, Typography } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

import ChoiceButton from "./components/ChoiceButton";
import HomeLayout from "../../../../shared/layouts/HomeLayout";

import { useWords } from "./hooks/useWords";

const { Text } = Typography;

const Words = () => {
  const {
    loading,
    currentLesson,
    lessonWords,
    currentQuestion,
    currentNumber,
  } = useSelector((state) => state.lesson);
  const { onPrevious, onNext, onSubmit } = useWords();

  return (
    <HomeLayout pageTitle="Lesson Quiz">
      {loading ? (
        <Spin />
      ) : (
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
          <div className="px-[2em]">
            <Text className="center p-[3em_0] text-4xl" strong>
              {currentQuestion?.question}
            </Text>
            <Row gutter={[15, 15]} className="mt-4">
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
