import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Empty,
  Modal,
  Row,
  Typography,
} from "antd";
import urlParse from "url-parse";

import Activities from "../../../../shared/components/Activities";
import HomeLayout from "../../../../shared/layouts/HomeLayout";
import WordsLearned from "../../../../shared/components/WordsLearned";
import UserFollows from "./components/UserFollows/UserFollows";

import { useProfileDetails } from "./hooks/useProfileDetails";
import { useFollow } from "./hooks/useFollow";

import styles from "./Profile.module.css";

const { Text } = Typography;

const Profile = () => {
  const { user } = useSelector((state) => state.currentUser);
  const location = useLocation();
  const { query } = urlParse(location.search, true);

  const {
    selectedUser,
    activities,
    followers,
    following,
    learnings,
    displayWords,
    setFollowers,
    setDisplayWords,
  } = useProfileDetails(query);

  const { followModal, setFollowModal, isFollowed, handleFollow } = useFollow(
    query,
    setFollowers
  );

  return (
    <HomeLayout pageTitle="Profile">
      <Modal
        title={followModal.name}
        open={followModal.show}
        onCancel={() => setFollowModal({ name: "", show: false })}
        footer={[
          <Button
            key="ok"
            onClick={() => setFollowModal({ name: "", show: false })}
          >
            OK
          </Button>,
        ]}
      >
        <UserFollows
          data={
            followModal.name === "Followers"
              ? followers.map((user) => user.Follower)
              : following.map((user) => user.Following)
          }
          setFollowModal={setFollowModal}
        />
      </Modal>
      <Row gutter={24}>
        <Col span="8">
          <Card className="center">
            {Object.keys(user).length ? (
              <Fragment>
                <Avatar
                  className={styles.userAvatar}
                  src={selectedUser.avatar_url}
                  shape="square"
                />
                <div className={styles.userDetails}>
                  <Text
                    className={styles.bigText}
                    strong
                  >{`${learnings?.user?.first_name} ${learnings?.user?.last_name}`}</Text>
                  <Text type="secondary">{`${learnings?.user?.email}`}</Text>

                  <Row className={styles.followRow} justify="space-evenly">
                    <Col
                      className={styles.followPoint}
                      onClick={() => {
                        setFollowModal({ name: "Followers", show: true });
                      }}
                    >
                      <Row justify="center">
                        <Text className={styles.bigText} strong>
                          {followers.length}
                        </Text>
                      </Row>
                      <Row justify="center">
                        {followers.length > 1 ? "Followers" : "Follower"}
                      </Row>
                    </Col>
                    <Col
                      className={styles.followPoint}
                      onClick={() => {
                        setFollowModal({ name: "Following", show: true });
                      }}
                    >
                      <Row justify="center">
                        <Text className={styles.bigText} strong>
                          {following.length}
                        </Text>
                      </Row>
                      <Row justify="center">Following</Row>
                    </Col>
                  </Row>
                  {user.id !== +query.user_id && (
                    <Button
                      className={styles.followBtn}
                      type="primary"
                      onClick={async () => await handleFollow()}
                    >
                      {isFollowed(+query.user_id) ? "Unfollow" : "Follow"}
                    </Button>
                  )}
                  <Divider />
                  <Button className={styles.learnedLessons}>
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
    </HomeLayout>
  );
};

export default Profile;
