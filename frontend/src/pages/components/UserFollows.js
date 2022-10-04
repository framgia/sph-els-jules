import React from "react";

import { blue } from "@ant-design/colors";
import { Avatar, List, Button } from "antd";

import { useNavigate } from "react-router-dom";

const UserFollows = ({ data, setModal }) => {
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
                onClick={() => {
                  navigate(`/profile?user_id=${item.id}`);
                  setModal({ name: "", show: false });
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
                  src="https://joeschmoe.io/api/v1/random"
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
