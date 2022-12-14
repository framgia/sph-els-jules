import { useSelector } from "react-redux";
import { Avatar, Card, Empty, List, Typography } from "antd";
import { blue } from "@ant-design/colors";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const { Text } = Typography;

const Activities = ({ title, activities }) => {
  const currentUser = useSelector((state) => state.currentUser.user);

  const renderTitle = (activity) => {
    const { user_id, relatable_type } = activity;

    let title;
    const you = user_id === currentUser.id ? "(You)" : "";

    if (relatable_type.includes("follow")) {
      const {
        User_follow: { user_id: following_id, Follower, Following },
      } = activity;
      const currentUserFollowed =
        following_id === currentUser.id ? "(You)" : "";
      const action = (
        <Text type="warning" strong code>
          {relatable_type === "follow" ? "followed" : "unfollowed"}
        </Text>
      );

      title = (
        <Text>
          {Follower.first_name} {Follower.last_name} {you} {action}{" "}
          {Following.first_name} {Following.last_name} {currentUserFollowed}
        </Text>
      );
    } else if (relatable_type === "lesson") {
      const { score, item_count, Lesson, User } = activity;
      const action = (
        <Text type="success" strong code>
          learned
        </Text>
      );
      const lesson = <Text type="danger">{Lesson.title}</Text>;

      title = (
        <Text delete={Lesson.deleted_at}>
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
    <Card
      title={
        <Text className="text-3xl" strong>
          {title}
        </Text>
      }
      className="h-[min(60vh,800px)] overflow-auto"
    >
      {activities.length > 0 ? (
        <List>
          {activities.map((activity) => {
            return (
              <List.Item key={activity.id}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={activity.User.avatar_url}
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
  );
};

export default Activities;
