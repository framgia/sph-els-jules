import React from "react";

import { blue } from "@ant-design/colors";
import { Layout, Avatar } from "antd";
import { Link } from "react-router-dom";

const { Header, Content } = Layout;

const HomeLayout = ({ children }) => {
  return (
    <>
      <Layout style={{ height: "100vh" }}>
        <Header style={{ backgroundColor: blue[6] }}>
          <div style={{ display: "flex" }}>
            <Link to="/" style={{ color: "#e6f7ff" }}>
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
              <li>
                <Avatar
                  src="https://joeschmoe.io/api/v1/random"
                  style={{ backgroundColor: blue[0] }}
                />
              </li>
            </ul>
          </div>
        </Header>
        <Content>{children}</Content>
      </Layout>
    </>
  );
};

export default HomeLayout;
