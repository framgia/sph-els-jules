import React, { useState, useEffect } from "react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { blue } from "@ant-design/colors";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Avatar, List, Empty, Typography } from "antd";

import api from "../helpers/api";

import HomeLayout from "../layouts/HomeLayout";

const { Text } = Typography;

const Dashboard = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);

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

    getActivities();
  }, [navigate]);

  const renderTitle = (activity) => {
    const { user_id, relatable_type } = activity;

    let title;
    const you = user_id === currentUser.id ? "(You)" : "";

    if (relatable_type === "follow") {
      const {
        User_follow: { user_id: following_id, Follower, Following },
      } = activity;
      const currentUserFollowed =
        following_id === currentUser.id ? "(You)" : "";
      const action = <Text type="warning">followed</Text>;

      title = (
        <Text>
          {Follower.first_name} {Follower.last_name} {you} {action}{" "}
          {Following.first_name} {Following.last_name} {currentUserFollowed}
        </Text>
      );
    } else if (relatable_type === "lesson") {
      const { score, item_count, Lesson, User } = activity;
      const action = <Text type="success">learned</Text>;
      const lesson = <Text type="danger">{Lesson.title}</Text>;

      title = (
        <Text>
          {User.first_name} {User.last_name} {you} {action} {score} of{" "}
          {item_count} words in {lesson}
        </Text>
      );
    }

    return title;
  };

  const renderDate = (date) => {
    dayjs.extend(relativeTime);
    return dayjs(date).fromNow();
  };

  return (
    <HomeLayout>
      <div style={{ padding: "2.5rem 5rem", height: "100%" }}>
        <h1 style={{ marginBottom: "8px" }}>Dashboard</h1>
        <Row gutter={24}>
          <Col span="8">
            <Card>
              <h1>User</h1>
            </Card>
          </Col>
          <Col span="16">
            <Card
              title={
                <Text style={{ fontSize: "30px" }} strong>
                  Activities
                </Text>
              }
              style={{ maxHeight: "700px", overflow: "auto" }}
            >
              {activities.length > 0 ? (
                <List>
                  {activities.map((activity) => {
                    return (
                      <List.Item key={activity.id}>
                        <List.Item.Meta
                          avatar={
                            <Avatar
                              src="https://joeschmoe.io/api/v1/random"
                              style={{ backgroundColor: blue[0] }}
                            />
                          }
                          title={renderTitle(activity)}
                          description={renderDate(activity.updatedAt)}
                        ></List.Item.Meta>
                      </List.Item>
                    );
                  })}
                </List>
              ) : (
                <Empty />
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </HomeLayout>
  );
};

export default Dashboard;
