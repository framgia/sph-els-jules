import { useSelector, useDispatch } from "react-redux";
import { Button } from "antd";

import { saveAnswer } from "../../../../../store/lessonSlice";

const ChoiceButton = ({ choice, selectedAnswer }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.currentUser);
  const { currentLesson, currentQuestion, currentNumber, currentAnswers } =
    useSelector((state) => state.lesson);
  return (
    <Button
      onClick={() => {
        const reqBody = {
          user_id: user.id,
          word_id: currentQuestion.id,
          lesson_id: currentLesson.id,
          answer: choice,
          is_correct: currentQuestion.correct_answer === choice,
        };
        dispatch(saveAnswer(reqBody));
      }}
      size="large"
      shape="round"
      type={
        currentAnswers[currentNumber - 1]?.answer === choice
          ? "primary"
          : "default"
      }
      block
    >
      {choice}
    </Button>
  );
};

export default ChoiceButton;
