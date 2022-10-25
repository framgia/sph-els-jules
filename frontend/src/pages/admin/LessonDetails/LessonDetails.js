import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Card, Spin } from "antd";
import urlParse from "url-parse";

import HomeLayout from "../../../shared/layouts/HomeLayout";
import LessonDetailsForm from "./components/LessonDetailsForm";

import { useLessonDetails } from "./hooks/useLessonDetails";

const LessonDetails = () => {
  const location = useLocation();
  const { query } = urlParse(location.search, true);
  const { onSubmit } = useLessonDetails(query.id);
  const { loading, currentLesson } = useSelector((state) => state.lesson);

  return (
    <HomeLayout pageTitle="Lesson Details">
      {loading ? (
        <Spin />
      ) : (
        <div className="flex justify-center">
          <Card
            className="min-h-[50vh] w-10/12 overflow-auto"
            title={`${currentLesson ? "Edit " : "Add"} Lesson`}
          >
            <LessonDetailsForm lesson={currentLesson} onSubmit={onSubmit} />
          </Card>
        </div>
      )}
    </HomeLayout>
  );
};

export default LessonDetails;
