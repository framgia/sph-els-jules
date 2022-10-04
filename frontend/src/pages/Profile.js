import React, { Fragment, useState, useEffect } from "react";

import { blue } from "@ant-design/colors";
import {
  Row,
  Col,
  Card,
  Avatar,
  Typography,
  Empty,
  Button,
  Divider,
  Modal,
  message,
} from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import urlParse from "url-parse";

import { getUserProfile, getLearnings, toggleFollow } from "../helpers/api";
import { authenticate } from "../helpers/auth";
import {
  addUserFeed,
  addActivity,
  updateFollowing,
} from "../store/currentUserSlice";

import HomeLayout from "../layouts/HomeLayout";
import Activities from "./components/Activities";
import WordsLearned from "./components/WordsLearned";
import UserFollows from "./components/UserFollows";

const { Text } = Typography;

const Profile = () => {
  const { user, following: userFollowing } = useSelector(
    (state) => state.currentUser
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { query } = urlParse(location.search, true);

  const [activities, setActivities] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [learnings, setLearnings] = useState({});
  const [displayWords, setDisplayWords] = useState(false);
  const [modal, setModal] = useState({
    name: "",
    show: false,
  });

  useEffect(() => {
    authenticate(navigate, dispatch);
    if (!user.id) return;

    getUserProfile(query.user_id, (followers, following, activity_logs) => {
      setActivities(activity_logs);
      setFollowers(followers);
      setFollowing(following);
    });

    getLearnings(query.user_id, (data) => {
      setLearnings(data);
    });
  }, [navigate, dispatch, query.user_id, user.id]);

  const isFollowed = (followingId) => {
    const findUser = userFollowing.find(
      (user) => user.user_id === followingId && user.is_followed
    );

    return !findUser;
  };

  const handleFollow = async () => {
    const data = await toggleFollow(user.id, +query.user_id);

    const {
      data: { activity_log, user_follow },
    } = data;

    if (data.meta.code === 200) {
      dispatch(addUserFeed(activity_log));
      dispatch(addActivity(activity_log));
      dispatch(updateFollowing(user_follow));
      await getUserProfile(
        query.user_id,
        (followers, following, activity_logs) => {
          setFollowers(followers);
        }
      );
      return;
    }

    message.error(data.meta.message);
  };

  return (
    <HomeLayout>
      <div
        style={{
          marginInline: "auto",
          padding: "2.5rem 0",
          width: "max(60vw, 600px)",
        }}
      >
        <Modal
          title={modal.name}
          open={modal.show}
          onCancel={() => setModal({ name: "", show: false })}
          footer={[
            <Button
              key="ok"
              onClick={() => setModal({ name: "", show: false })}
            >
              OK
            </Button>,
          ]}
        >
          <UserFollows
            data={
              modal.name === "Followers"
                ? followers.map((user) => user.Follower)
                : following.map((user) => user.Following)
            }
            setModal={setModal}
          />
        </Modal>
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
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Text
                      style={{ fontSize: "1.5rem" }}
                      strong
                    >{`${learnings.user.first_name} ${learnings.user.last_name}`}</Text>
                    <Text type="secondary">{`${learnings.user.email}`}</Text>

                    <Row
                      justify="space-evenly"
                      style={{ marginTop: ".75em", width: "100%" }}
                    >
                      <Col
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setModal({ name: "Followers", show: true });
                        }}
                      >
                        <Row justify="center">
                          <Text strong style={{ fontSize: "1.5rem" }}>
                            {followers.length}
                          </Text>
                        </Row>
                        <Row justify="center">
                          {followers.length > 1 ? "Followers" : "Follower"}
                        </Row>
                      </Col>
                      <Col
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setModal({ name: "Following", show: true });
                        }}
                      >
                        <Row justify="center">
                          <Text strong style={{ fontSize: "1.5rem" }}>
                            {following.length}
                          </Text>
                        </Row>
                        <Row justify="center">Following</Row>
                      </Col>
                    </Row>
                    {user.id !== +query.user_id && (
                      <Button
                        type="primary"
                        style={{
                          marginTop: "1.5em",
                          borderRadius: "1.5rem",
                          width: "100%",
                        }}
                        onClick={async () => await handleFollow()}
                      >
                        {isFollowed(+query.user_id) ? "Follow" : "Unfollow"}
                      </Button>
                    )}
                    <Divider />
                    <Button
                      style={{
                        marginBottom: ".5rem",
                        width: "100%",
                        cursor: "default",
                      }}
                    >
                      {`Learned ${learnings.learnedLessons} ${
                        learnings.learnedLessons > 1 ? "lessons" : "lesson"
                      }`}
                    </Button>
                    <Button
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
                userId={query.user_id}
                setDisplayWords={setDisplayWords}
              />
            ) : (
              <Activities title="Activities" activities={activities} />
            )}
          </Col>
        </Row>
      </div>
    </HomeLayout>
  );
};

export default Profile;
