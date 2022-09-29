import React, { Fragment, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { blue } from "@ant-design/colors";
import { Row, Col, Card, Avatar, Typography, Empty, Button } from "antd";
import { Link } from "react-router-dom";

import api from "../helpers/api";

import HomeLayout from "../layouts/HomeLayout";
import Activities from "./components/Activities";
import WordsLearned from "./components/WordsLearned";

const { Text } = Typography;

const Dashboard = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [learnings, setLearnings] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [displayWords, setDisplayWords] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (!loggedInUser) {
      return navigate("/login");
    }

    const currentUser = JSON.parse(loggedInUser);
    setCurrentUser(currentUser);
    const getActivities = async () => {
      const { data } = await api.get("/users/activity-logs", {
        params: {
          user_id: currentUser.id,
        },
      });
      setActivities(data.data.activity_logs);
    };

    const getLearnings = async () => {
      const { data } = await api.get("/users/learn-count/", {
        params: {
          user_id: currentUser.id,
        },
      });
      setLearnings(data.data);
    };

    getActivities();
    getLearnings();
  }, [navigate]);

  return (
    <HomeLayout>
      <div
        style={{
          marginInline: "auto",
          padding: "2.5rem 0",
          height: "100%",
          width: "min(80vw, 1000px)",
        }}
      >
        <h1 style={{ marginBottom: "8px" }}>Dashboard</h1>
        <Row gutter={24}>
          <Col span="8">
            <Card className="center">
              {Object.keys(learnings).length ? (
                <Fragment>
                  <Avatar
                    src="https://joeschmoe.io/api/v1/random"
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
                    >{`${learnings.user.first_name} ${learnings.user.last_name}`}</Text>
                    <Text type="secondary">{`${learnings.user.email}`}</Text>
                    <Link
                      to="/"
                      style={{
                        fontSize: "1rem",
                        margin: "0.5rem 0",
                        width: "100%",
                      }}
                    >
                      <Button style={{ width: "100%" }}>
                        {`Learned ${learnings.learnedLessons} ${
                          learnings.learnedLessons > 1 ? "lessons" : "lesson"
                        }`}
                      </Button>
                    </Link>
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
              <WordsLearned
                user_id={currentUser.id}
                setDisplayWords={setDisplayWords}
              />
            ) : (
              <Activities activities={activities} currentUser={currentUser} />
            )}
          </Col>
        </Row>
      </div>
    </HomeLayout>
  );
};

export default Dashboard;
