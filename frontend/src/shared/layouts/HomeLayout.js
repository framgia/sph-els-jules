import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  PoweroffOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { blue } from "@ant-design/colors";
import { Avatar, Dropdown, Menu, Layout, Typography } from "antd";

import { resetState as userReset } from "../../store/currentUserSlice";
import { resetState as lessonReset } from "../../store/lessonSlice";

const { Header, Content } = Layout;
const { Text } = Typography;

const HomeLayout = ({ pageTitle, children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser.user);
  const admin = JSON.parse(localStorage.getItem("user"))?.user_type === "admin";

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
          disabled: admin,
        },
        {
          key: "2",
          label: "Edit Profile",
          icon: <SettingOutlined spin style={{ fontSize: "1em" }} />,
          onClick: () => {
            navigate("/edit-profile");
          },
          disabled: admin,
        },
        { type: "divider" },
        {
          key: "3",
          label: "Logout",
          icon: <PoweroffOutlined style={{ fontSize: "1em" }} />,
          onClick: () => {
            localStorage.clear();
            dispatch(userReset());
            dispatch(lessonReset());
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
            <Link to={admin ? "/admin/lessons" : "/"}>
              <Text className="page-header-title">
                E-Learning {admin && <Text type="secondary"> Admin</Text>}
              </Text>
            </Link>
            <ul>
              <li>
                <Link
                  to={admin ? "/admin/lessons" : "/lessons"}
                  style={{ fontSize: "1.5rem" }}
                >
                  Lessons
                </Link>
              </li>
              <li>
                <Link to="/users" style={{ fontSize: "1.5rem" }}>
                  {admin ? "Admins" : "Users"}
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
