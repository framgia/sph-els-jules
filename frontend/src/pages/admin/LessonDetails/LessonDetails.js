import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Card, Spin } from "antd";
import urlParse from "url-parse";

import HomeLayout from "../../../shared/layouts/HomeLayout";
import LessonDetailsForm from "./components/LessonDetailsForm";

import { useLessonDetails } from "./hooks/useLessonDetails";

import styles from "./LessonDetails.module.css";

const LessonDetails = () => {
  const location = useLocation();
  const { query } = urlParse(location.search, true);
  const { loading, onSubmit } = useLessonDetails(query.id);
  const { currentLesson } = useSelector((state) => state.lesson);

  return (
    <HomeLayout pageTitle="Lesson Details">
      {loading ? (
        <Spin />
      ) : (
        <div className={styles.cardContainer}>
          <Card
            className={styles.cardForm}
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
