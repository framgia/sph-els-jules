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

  const you = isCurrentUser ? (
    <Text keyboard type="warning">
      You
    </Text>
  ) : (
    ""
  );

  return (
    <List.Item
      key={user.id}
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
            style={{ width: "90px" }}
            type={isUserFollowed ? "danger" : "primary"}
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
            {user.first_name} {user.last_name} {you}
          </Text>
        }
        description={user.email}
      />
    </List.Item>
  );
};

export default UserListItems;
