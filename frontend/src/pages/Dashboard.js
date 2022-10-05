import React, { Fragment, useState, useEffect } from "react";

import { blue } from "@ant-design/colors";
import { Row, Col, Card, Avatar, Typography, Empty, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { authenticate } from "../helpers/auth";

import HomeLayout from "../layouts/HomeLayout";
import Activities from "./components/Activities";
import WordsLearned from "./components/WordsLearned";

const { Text } = Typography;

const Dashboard = () => {
  const { user, userFeed, learnings } = useSelector(
    (state) => state.currentUser
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [displayWords, setDisplayWords] = useState(false);

  useEffect(() => {
    authenticate(navigate, dispatch);
    if (!user.id) return;
  }, [navigate, dispatch, user.id]);

  return (
    <HomeLayout>
      <h1 style={{ marginBottom: "8px" }}>Dashboard</h1>
      <Row gutter={24}>
        <Col span="8">
          <Card className="center">
            {Object.keys(user).length ? (
              <Fragment>
                <Avatar
                  src={user.avatar_url}
                  shape="square"
                  style={{
                    backgroundColor: blue[0],
                    width: "100%",
                    height: "auto",
                    aspectRatio: "1 / 1",
                  }}
                />
                <div className="center" style={{ flexDirection: "column" }}>
                  <Text
                    style={{ fontSize: "1.5rem" }}
                    strong
                  >{`${user.first_name} ${user.last_name}`}</Text>
                  <Text type="secondary">{`${user.email}`}</Text>
                  <Button
                    style={{
                      margin: "0.5rem 0",
                      width: "100%",
                      cursor: "default",
                    }}
                  >
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
