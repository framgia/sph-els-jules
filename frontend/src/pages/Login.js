import React from "react";

import { Link, useNavigate } from "react-router-dom";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Row, Col, Button, Form, Input, message } from "antd";

import api from "../helpers/api";
import loginIllustration from "../images/login_illustration.svg";

import AuthLayout from "../layouts/AuthLayout";

const Login = () => {
  const navigate = useNavigate();
  const login = async (values) => {
    const { email, password } = values;
    const { data } = await api.post("/login", { email, password });
    const { data: userData, meta } = data;
    const { user } = userData;

    if (meta.code === 200) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          user_type: user.user_type,
        })
      );
      return navigate("/");
    }

    message.error(meta.message);
  };
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
            <Link to="/signup">
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
