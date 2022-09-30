import React, { Fragment, useState, useEffect } from "react";

import { blue } from "@ant-design/colors";
import { Row, Col, Card, Avatar, Typography, Empty, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import api from "../helpers/api";
import { checkLogin } from "../helpers/checkLogin";
import { setCurrentUser } from "../store/currentUserSlice";
import { setUserProfile } from "../store/profileSlice";

import HomeLayout from "../layouts/HomeLayout";
import Activities from "./components/Activities";
import WordsLearned from "./components/WordsLearned";

const { Text } = Typography;

const Profile = () => {
  const userProfile = useSelector((state) => state.profile.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activities, setActivities] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [learnings, setLearnings] = useState({});
  const [displayWords, setDisplayWords] = useState(false);

  useEffect(() => {
    let currentUser;
    if (!userProfile?.id) {
      currentUser = checkLogin(navigate);
      dispatch(setCurrentUser(currentUser));
      dispatch(setUserProfile(currentUser));
      return;
    }

    const getUserProfile = async () => {
      const { data } = await api.get("/users/profile", {
        params: {
          user_id: userProfile.id ? userProfile.id : currentUser.id,
        },
      });
      const { data: newData } = data;

      setFollowers(newData.followers);
      setFollowing(newData.following);
      setActivities(newData.activity_logs);
    };

    const getLearnings = async () => {
      const { data } = await api.get("/users/learn-count/", {
        params: {
          user_id: userProfile.id ? userProfile.id : currentUser.id,
        },
      });
      setLearnings(data.data);
    };

    getUserProfile();
    getLearnings();
  }, [navigate, dispatch, userProfile]);

  return (
    <HomeLayout>
      <div
        style={{
          marginInline: "auto",
          padding: "2.5rem 0",
          width: "min(80vw, 60%)",
        }}
      >
        <h1 style={{ marginBottom: "8px" }}>Profile</h1>
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
                    <Row
                      justify="center"
                      gutter={48}
                      style={{ marginTop: "1.5em" }}
                    >
                      <Col>
                        <Row justify="center">
                          <Text strong style={{ fontSize: "1.5rem" }}>
                            {followers.length}
                          </Text>
                        </Row>
                        <Row justify="center">
                          {followers.length > 1 ? "Followers" : "Follower"}
                        </Row>
                      </Col>
                      <Col>
                        <Row justify="center">
                          <Text strong style={{ fontSize: "1.5rem" }}>
                            {following.length}
                          </Text>
                        </Row>
                        <Row justify="center">Following</Row>
                      </Col>
                    </Row>
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
                user_id={userProfile.id}
                setDisplayWords={setDisplayWords}
              />
            ) : (
              <Activities activities={activities} />
            )}
          </Col>
        </Row>
      </div>
    </HomeLayout>
  );
};

export default Profile;
