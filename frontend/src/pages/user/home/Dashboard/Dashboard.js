import { Fragment } from "react";
import { Avatar, Button, Card, Col, Empty, Row, Typography } from "antd";
import { useSelector } from "react-redux";

import Activities from "../../../../shared/components/Activities";
import HomeLayout from "../../../../shared/layouts/HomeLayout";
import WordsLearned from "../../../../shared/components/WordsLearned";

import { useDashboard } from "./hooks/useDashboard";

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
                  className="user-avatar"
                  src={user.avatar_url}
                  shape="square"
                />
                <div className="user-details">
                  <Text
                    className="text-2xl"
                    strong
                  >{`${user.first_name} ${user.last_name}`}</Text>
                  <Text type="secondary">{`${user.email}`}</Text>
                  <Button block className="learned-lessons">
                    {`Learned ${learnings.learnedLessons} ${
                      learnings.learnedLessons > 1 ? "lessons" : "lesson"
                    }`}
                  </Button>
                  <Button
                    className="bg-[theme(colors.primary)]"
                    type="primary"
                    onClick={() => {
                      setDisplayWords(true);
                    }}
                    block
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
