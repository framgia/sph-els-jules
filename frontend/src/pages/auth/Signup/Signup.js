import { Link } from "react-router-dom";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Typography } from "antd";

import AuthLayout from "../../../shared/layouts/AuthLayout";
import signupIllustration from "../../../images/signup_illustration.svg";

import { useSignup } from "./hooks/useSignup";

const { Text } = Typography;

const Signup = () => {
  const { userSignup } = useSignup();

  return (
    <AuthLayout illustration={signupIllustration}>
      <div className="w-[min(25vw,400px)] text-center">
        <Form onFinish={userSignup} autoComplete="off">
          <h1 className="text-3xl font-medium">Sign Up</h1>
          <h4 className="mt-2 mb-5">
            <Text type="secondary">Welcome to E-Learning App</Text>
          </h4>
          <Form.Item
            name="first_name"
            rules={[
              { required: true, message: "Please input your first name" },
              {
                whitespace: true,
                message: "Missing Value",
              },
            ]}
          >
            <Input className="input-text" placeholder="First Name" />
          </Form.Item>

          <Form.Item
            name="last_name"
            rules={[
              { required: true, message: "Please input your last name" },
              {
                whitespace: true,
                message: "Missing Value",
              },
            ]}
          >
            <Input className="input-text" placeholder="Last Name" />
          </Form.Item>

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
            Register
          </Button>
        </Form>
        <Row className="mt-2" gutter={5}>
          <Col className="center">
            <h4>
              <Text type="secondary">Already have an account?</Text>
            </h4>
          </Col>
          <Col>
            <Link to="/login">
              <Button type="link" className="p-0">
                Sign In!
              </Button>
            </Link>
          </Col>
        </Row>
      </div>
    </AuthLayout>
  );
};

export default Signup;
