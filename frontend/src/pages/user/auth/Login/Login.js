import { Link } from "react-router-dom";
import { Button, Col, Form, Input, Row } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

import AuthLayout from "../../../../shared/layouts/AuthLayout";
import loginIllustration from "../../../../images/login_illustration.svg";

import { useLogin } from "./hooks/useLogin";

const Login = () => {
  const { login } = useLogin();

  return (
    <AuthLayout illustration={loginIllustration}>
      <div style={{ textAlign: "center", width: "min(25vw, 400px)" }}>
        <Form onFinish={login} autoComplete="off">
          <h1>Sign In</h1>
          <h4 style={{ color: "#8C8C8C", marginBottom: "20px" }}>
            Welcome to E-Learning App
          </h4>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email address" },
              {
                whitespace: true,
                message: "Missing Value",
              },
            ]}
          >
            <Input
              className="form-input"
              placeholder="Email Address"
              style={{ padding: "0.7em 1em" }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please input your password" },
              {
                whitespace: true,
                message: "Missing Value",
              },
            ]}
          >
            <Input.Password
              className="form-input"
              placeholder="Password"
              style={{ padding: "0.7em 1em" }}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            style={{ borderRadius: "7px", height: "3em" }}
            block
          >
            Login
          </Button>
        </Form>
        <Row style={{ marginTop: "10px" }} gutter={5}>
          <Col className="center">
            <h4
              style={{
                color: "#8C8C8C",
                marginBottom: 0,
              }}
            >
              Don't have an account yet?
            </h4>
          </Col>
          <Col>
            <Link to="/signup" className="center">
              <Button type="link" style={{ padding: 0 }}>
                Sign Up!
              </Button>
            </Link>
          </Col>
        </Row>
      </div>
    </AuthLayout>
  );
};

export default Login;
