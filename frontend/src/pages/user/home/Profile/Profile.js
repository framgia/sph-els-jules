import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Modal,
  Row,
  Spin,
  Typography,
} from "antd";
import urlParse from "url-parse";

import Activities from "../../../../shared/components/Activities";
import HomeLayout from "../../../../shared/layouts/HomeLayout";
import WordsLearned from "../../../../shared/components/WordsLearned";
import UserFollows from "./components/UserFollows/UserFollows";

import { useProfileDetails } from "./hooks/useProfileDetails";
import { useFollow } from "./hooks/useFollow";

const { Text } = Typography;

const Profile = () => {
  const { loading, user } = useSelector((state) => state.currentUser);
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
            {!loading ? (
              <Fragment>
                <Avatar
                  className="user-avatar"
                  src={selectedUser.avatar_url}
                  shape="square"
                />
                <div className="user-details">
                  <Text
                    className="text-2xl"
                    strong
                  >{`${selectedUser.first_name} ${selectedUser.last_name}`}</Text>
                  <Text type="secondary">{`${selectedUser.email}`}</Text>

                  <Row className="mt-3 w-full" justify="space-evenly">
                    <Col
                      className="cursor-pointer"
                      onClick={() => {
                        setFollowModal({ name: "Followers", show: true });
                      }}
                    >
                      <Row justify="center">
                        <Text className="text-2xl" strong>
                          {followers.length}
                        </Text>
                      </Row>
                      <Row justify="center">
                        {followers.length > 1 ? "Followers" : "Follower"}
                      </Row>
                    </Col>
                    <Col
                      className="cursor-pointer"
                      onClick={() => {
                        setFollowModal({ name: "Following", show: true });
                      }}
                    >
                      <Row justify="center">
                        <Text className="text-2xl" strong>
                          {following.length}
                        </Text>
                      </Row>
                      <Row justify="center">Following</Row>
                    </Col>
                  </Row>
                  {user.id !== +query.user_id && (
                    <Button
                      loading={loading}
                      shape="round"
                      block
                      className="mt-6 mb-1 bg-[theme(colors.primary)]"
                      type="primary"
                      onClick={() => handleFollow()}
                    >
                      {isFollowed(+query.user_id) ? "Unfollow" : "Follow"}
                    </Button>
                  )}
                  <Divider />
                  <Button className="mb-2 cursor-default" block>
                    {`Learned ${learnings.learnedLessons} ${
                      learnings.learnedLessons > 1 ? "lessons" : "lesson"
                    }`}
                  </Button>
                  <Button
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
              <Spin />
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
