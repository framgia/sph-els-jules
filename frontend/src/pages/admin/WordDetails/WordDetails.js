import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Card, Spin, Typography } from "antd";
import urlParse from "url-parse";

import HomeLayout from "../../../shared/layouts/HomeLayout";
import WordDetailsForm from "./components/WordDetailsForm";

import { useWordDetails } from "./hooks/useWordDetails";

const { Text } = Typography;

const WordDetails = () => {
  const location = useLocation();
  const { query } = urlParse(location.search, true);
  const { loading, currentWord, onSubmit } = useWordDetails(
    query.lesson_id,
    query.word_id
  );
  const { currentLesson } = useSelector((state) => state.lesson);

  return (
    <HomeLayout pageTitle="Word Details">
      {loading ? (
        <Spin />
      ) : (
        <div className="flex justify-center">
          <Card
            className="min-h-[50vh] w-10/12 overflow-auto"
            title={
              <Text>
                {currentWord ? "Edit" : "Add"} Word -
                <Text strong> {currentLesson?.title}</Text>
              </Text>
            }
          >
            <WordDetailsForm word={currentWord} onSubmit={onSubmit} />
          </Card>
        </div>
      )}
    </HomeLayout>
  );
};

export default WordDetails;
