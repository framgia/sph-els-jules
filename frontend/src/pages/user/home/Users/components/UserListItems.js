import { useState } from "react";
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
  const [loading, setLoading] = useState(false);

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
            loading={loading}
            danger={isUserFollowed}
            className={`w-28 ${
              !isUserFollowed && "bg-[theme(colors.primary)]"
            }`}
            type="primary"
            onClick={async () => {
              setLoading(true);
              await handleFollow(user.id);
              setLoading(false);
            }}
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
