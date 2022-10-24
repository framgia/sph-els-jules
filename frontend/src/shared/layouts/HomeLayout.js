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
      items={[
        {
          key: "1",
          label: "My Profile",
          icon: <UserOutlined className="text-base" />,
          onClick: () => {
            navigate(`/profile?user_id=${currentUser.id}`);
          },
          disabled: admin,
        },
        {
          key: "2",
          label: "Edit Profile",
          icon: <SettingOutlined spin className="text-base" />,
          onClick: () => {
            navigate("/edit-profile");
          },
          disabled: admin,
        },
        { type: "divider" },
        {
          key: "3",
          label: "Logout",
          icon: <PoweroffOutlined className="text-base" />,
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
      <Layout className="h-screen">
        <Header style={{ backgroundColor: blue[6] }}>
          <div className="flex">
            <Link to={admin ? "/admin/lessons" : "/"}>
              <Text ellipsis className="text-[1.8rem] text-[#E6F7FF]">
                E-Learning {admin && <Text type="secondary"> Admin</Text>}
              </Text>
            </Link>
            <ul className="ml-auto flex gap-8 font-medium text-[#E6F7FF]">
              <li>
                <Link
                  to={admin ? "/admin/lessons" : "/lessons"}
                  className="text-[1.5rem]"
                >
                  Lessons
                </Link>
              </li>
              <li>
                <Link
                  to={admin ? "/admins" : "/users"}
                  className="text-[1.5rem]"
                >
                  {admin ? "Admins" : "Users"}
                </Link>
              </li>
              <li className="cursor-pointer">
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
          <div className="mx-auto w-[max(60vw,600px)] py-10">
            <h1 className="mb-2 text-2xl font-medium">{pageTitle}</h1>
            {children}
          </div>
        </Content>
      </Layout>
    </Fragment>
  );
};

export default HomeLayout;
