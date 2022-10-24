import { useNavigate } from "react-router-dom";
import { Avatar, Button, List, Typography } from "antd";
import { blue } from "@ant-design/colors";

const { Text } = Typography;

const UserListItems = ({
  user,
  isCurrentUser,
  isUserFollowed,
  handleFollow,
}) => {
  const navigate = useNavigate();

  return (
    <List.Item
      actions={[
        !isCurrentUser && (
          <Button
            onClick={() => {
              navigate(`/profile?user_id=${user.id}`);
            }}
          >
            Profile
          </Button>
        ),
      ]}
      extra={
        !isCurrentUser && (
          <Button
            danger={isUserFollowed}
            className="w-24 bg-[theme(colors.primary)]"
            type="primary"
            onClick={() => handleFollow(user.id)}
          >
            {isUserFollowed ? "Unfollow" : "Follow"}
          </Button>
        )
      }
    >
      <List.Item.Meta
        avatar={
          <Avatar style={{ backgroundColor: blue[0] }} src={user.avatar_url} />
        }
        title={
          <Text strong>
            {user.first_name} {user.last_name}{" "}
            {isCurrentUser && (
              <Text keyboard type="warning">
                You
              </Text>
            )}
          </Text>
        }
        description={user.email}
      />
    </List.Item>
  );
};

export default UserListItems;
