import { Link } from "react-router-dom";
import { Button, Col, Form, Input, Row, Typography } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

import AuthLayout from "../../../shared/layouts/AuthLayout";
import loginIllustration from "../../../images/login_illustration.svg";

import { useLogin } from "./hooks/useLogin";

const { Text } = Typography;

const Login = () => {
  const { userLogin } = useLogin();

  return (
    <AuthLayout illustration={loginIllustration}>
      <div className="w-[min(25vw,400px)] text-center">
        <Form onFinish={userLogin} autoComplete="off">
          <h1 className="text-3xl font-medium">Sign In</h1>
          <h4 className="mt-2 mb-5">
            <Text type="secondary">Welcome to E-Learning App</Text>
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
            <Input className="input-text" placeholder="Email Address" />
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
              className="input-text"
              placeholder="Password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            className="h-10 rounded-md bg-[theme(colors.primary)]"
            block
          >
            Login
          </Button>
        </Form>
        <Row className="mt-2" gutter={5}>
          <Col className="center">
            <h4>
              <Text type="secondary">Don't have an account yet?</Text>
            </h4>
          </Col>
          <Col>
            <Link to="/signup">
              <Button className="p-0" type="link">
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
