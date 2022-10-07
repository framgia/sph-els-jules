import { useNavigate } from "react-router-dom";
import { Button } from "antd";

const ChoiceButton = ({
  lessonWords,
  question,
  choice,
  currentNumber,
  setCurrentQuestion,
  setCurrentNumber,
  processAnswer,
}) => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => {
        processAnswer(question, choice);
        if (currentNumber === lessonWords?.length) {
          navigate("/lessons"); //! Temporary
          // Output result page
          return;
        }
        setCurrentQuestion(lessonWords?.[currentNumber]);
        setCurrentNumber((prevNumber) => prevNumber + 1);
      }}
      size="large"
      shape="round"
      type="primary"
      block
    >
      {choice}
    </Button>
  );
};

export default ChoiceButton;
