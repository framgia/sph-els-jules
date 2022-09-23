import React from "react";

import { blue } from "@ant-design/colors";
import { Row, Col, Image } from "antd";

import LoginForm from "./components/LoginForm";
import loginIllustration from "../images/login_illustration.svg";

const Login = () => {
  return (
    <div>
      <Row style={{ height: "100vh" }}>
        <Col className="center" span={8}>
          <LoginForm />
        </Col>
        <Col
          className="center"
          span={16}
          style={{
            backgroundColor: blue.primary,
            backgroundImage: `linear-gradient(160deg, ${blue.primary} 0%, #80D0C7 100%)`,
          }}
        >
          <Image
            style={{ width: "min(50vw, 800px)" }}
            preview={false}
            src={loginIllustration}
            alt="login_illustration"
          />
        </Col>
      </Row>
    </div>
  );
};

export default Login;
