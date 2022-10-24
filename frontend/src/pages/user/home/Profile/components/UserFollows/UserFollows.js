import { useNavigate } from "react-router-dom";
import { Avatar, Button, List } from "antd";
import { blue } from "@ant-design/colors";

const UserFollows = ({ data, setFollowModal }) => {
  const navigate = useNavigate();
  return (
    <List bordered>
      {data.map((item) => {
        return (
          <List.Item
            key={item.id}
            actions={[
              <Button
                type="primary"
                className="bg-[theme(colors.primary)]"
                onClick={() => {
                  navigate(`/profile?user_id=${item.id}`);
                  setFollowModal({ name: "", show: false });
                }}
              >
                Profile
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  style={{ backgroundColor: blue[0] }}
                  src={item.avatar_url}
                />
              }
              title={`${item.first_name} ${item.last_name}`}
              description={`${item.email}`}
            />
          </List.Item>
        );
      })}
    </List>
  );
};

export default UserFollows;
