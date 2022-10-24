import { Avatar, Col, Row } from "antd";
import { BoxPlotTwoTone } from "@ant-design/icons";
import { blue } from "@ant-design/colors";

import AuthIllustration from "../components/AuthIllustration";

const AuthLayout = ({ children, illustration }) => {
  return (
    <Row className="h-screen">
      <Col className="flex flex-col items-center justify-center" span={8}>
        <Avatar
          className="mb-1 flex items-center justify-center"
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
