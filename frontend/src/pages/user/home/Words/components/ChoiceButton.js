import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "antd";

import {
  nextQuestion,
  nextNumber,
  submitAnswer,
} from "../../../../../store/lessonSlice";

const ChoiceButton = ({ choice }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.currentUser);
  const { currentLesson, lessonWords, currentQuestion, currentNumber } =
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
        dispatch(submitAnswer(reqBody));

        if (currentNumber === lessonWords?.length) {
          navigate("/lessons"); //! Temporary
          // Output result page
          return;
        }
        dispatch(nextQuestion(lessonWords?.[currentNumber]));
        dispatch(nextNumber(currentNumber + 1));
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
