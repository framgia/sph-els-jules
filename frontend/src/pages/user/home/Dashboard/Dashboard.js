import { Fragment } from "react";
import { Avatar, Button, Card, Col, Empty, Row, Typography } from "antd";
import { useSelector } from "react-redux";

import Activities from "../../../../shared/components/Activities";
import HomeLayout from "../../../../shared/layouts/HomeLayout";
import WordsLearned from "../../../../shared/components/WordsLearned";

import { useDashboard } from "./hooks/useDashboard";

import styles from "./Dashboard.module.css";

const { Text } = Typography;

const Dashboard = () => {
  const { user, userFeed, learnings } = useSelector(
    (state) => state.currentUser
  );
  const { displayWords, setDisplayWords } = useDashboard();

  return (
    <HomeLayout pageTitle="Dashboard">
      <Row gutter={24}>
        <Col span="8">
          <Card className="center">
            {Object.keys(user).length ? (
              <Fragment>
                <Avatar
                  className={styles.avatar}
                  src={user.avatar_url}
                  shape="square"
                />
                <div className={styles.userDetails}>
                  <Text
                    style={{ fontSize: "1.5rem" }}
                    strong
                  >{`${user.first_name} ${user.last_name}`}</Text>
                  <Text type="secondary">{`${user.email}`}</Text>
                  <Button className={styles.learnedLessons}>
                    {`Learned ${learnings.learnedLessons} ${
                      learnings.learnedLessons > 1 ? "lessons" : "lesson"
                    }`}
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => {
                      setDisplayWords(true);
                    }}
                    style={{ width: "100%" }}
                  >
                    {`Learned ${learnings.learnedWords} ${
                      learnings.learnedWords > 1 ? "words" : "word"
                    }`}
                  </Button>
                </div>
              </Fragment>
            ) : (
              <Empty />
            )}
          </Card>
        </Col>
        <Col span="16">
          {displayWords ? (
            <WordsLearned userId={user.id} setDisplayWords={setDisplayWords} />
          ) : (
            <Activities title="User Feed" activities={userFeed} />
          )}
        </Col>
      </Row>
    </HomeLayout>
  );
};

export default Dashboard;
