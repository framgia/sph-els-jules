import { Avatar, Col, Row } from "antd";
import { BoxPlotTwoTone } from "@ant-design/icons";
import { blue } from "@ant-design/colors";

import AuthIllustration from "../components/AuthIllustration";

const AuthLayout = ({ children, illustration }) => {
  return (
    <Row style={{ height: "100vh" }}>
      <Col className="center" style={{ flexDirection: "column" }} span={8}>
        <Avatar
          style={{ backgroundColor: blue[0] }}
          size={64}
          icon={<BoxPlotTwoTone />}
        />
        {children}
      </Col>
      <AuthIllustration illustration={illustration} />
    </Row>
  );
};

export default AuthLayout;
