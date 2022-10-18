import { Avatar, List, Typography } from "antd";
import { blue } from "@ant-design/colors";

const { Text } = Typography;

const AdminListItems = ({ admin, isCurrentUser }) => {
  const you = isCurrentUser ? (
    <Text keyboard type="warning">
      You
    </Text>
  ) : (
    ""
  );

  return (
    <List.Item>
      <List.Item.Meta
        avatar={
          <Avatar style={{ backgroundColor: blue[0] }} src={admin.avatar_url} />
        }
        title={
          <Text strong>
            {admin.first_name} {admin.last_name} {you}
          </Text>
        }
        description={admin.email}
      />
    </List.Item>
  );
};

export default AdminListItems;
