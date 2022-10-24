import { Avatar, List, Typography } from "antd";
import { blue } from "@ant-design/colors";

const { Text } = Typography;

const AdminListItems = ({ admin, isCurrentUser }) => {
  return (
    <List.Item>
      <List.Item.Meta
        avatar={
          <Avatar style={{ backgroundColor: blue[0] }} src={admin.avatar_url} />
        }
        title={
          <Text strong>
            {admin.first_name} {admin.last_name}{" "}
            {isCurrentUser && (
              <Text keyboard type="warning">
                You
              </Text>
            )}
          </Text>
        }
        description={admin.email}
      />
    </List.Item>
  );
};

export default AdminListItems;
