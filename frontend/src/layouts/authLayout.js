import React from "react";

import { blue } from "@ant-design/colors";
import { BoxPlotTwoTone } from "@ant-design/icons";
import { Row, Col, Avatar } from "antd";

import Illustration from "../pages/components/authIllustration";

const AuthLayout = ({ children, illustration }) => {
  return (
    <Row style={{ height: "100vh" }}>
      <Col className="center" style={{ flexDirection: "column" }} span={8}>
        <Avatar
          style={{ margin: "center", backgroundColor: blue[0] }}
          size={64}
          icon={<BoxPlotTwoTone />}
        />
        {children}
      </Col>
      <Illustration illustration={illustration} />
    </Row>
  );
};

export default AuthLayout;
