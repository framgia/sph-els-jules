import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  PoweroffOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { blue } from "@ant-design/colors";
import { Avatar, Dropdown, Menu, Layout } from "antd";

const { Header, Content } = Layout;

const HomeLayout = ({ pageTitle, children }) => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.currentUser.user);

  const menu = (
    <Menu
      style={{ display: "block" }}
      items={[
        {
          key: "1",
          label: "My Profile",
          icon: <UserOutlined style={{ fontSize: "1em" }} />,
          onClick: () => {
            navigate(`/profile?user_id=${currentUser.id}`);
          },
        },
        {
          key: "2",
          label: "Edit Profile",
          icon: <SettingOutlined spin style={{ fontSize: "1em" }} />,
          onClick: () => {
            navigate(`/edit-profile?user_id=${currentUser.id}`);
          },
        },
        { type: "divider" },
        {
          key: "3",
          label: "Logout",
          icon: <PoweroffOutlined style={{ fontSize: "1em" }} />,
          onClick: () => {
            localStorage.clear();
            navigate("/login");
          },
        },
      ]}
    />
  );

  return (
    <Fragment>
      <Layout style={{ height: "100vh" }}>
        <Header style={{ backgroundColor: blue[6] }}>
          <div style={{ display: "flex" }}>
            <Link to="/" style={{ color: "#E6F7FF" }}>
              E-Learning
            </Link>
            <ul>
              <li>
                <Link to="/" style={{ fontSize: "1.5rem" }}>
                  Lessons
                </Link>
              </li>
              <li>
                <Link to="/" style={{ fontSize: "1.5rem" }}>
                  Users
                </Link>
              </li>
              <li style={{ cursor: "pointer" }}>
                <Dropdown overlay={menu} trigger={["click"]}>
                  <Avatar
                    src={currentUser.avatar_url}
                    style={{ backgroundColor: blue[0] }}
                  />
                </Dropdown>
              </li>
            </ul>
          </div>
        </Header>
        <Content>
          <div
            style={{
              marginInline: "auto",
              padding: "2.5rem 0",
              width: "max(60vw, 600px)",
            }}
          >
            <h1 style={{ marginBottom: "8px" }}>{pageTitle}</h1>
            {children}
          </div>
        </Content>
      </Layout>
    </Fragment>
  );
};

export default HomeLayout;
