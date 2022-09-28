import React from "react";

import { Link, useNavigate } from "react-router-dom";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Row, Col, Button, Form, Input, message } from "antd";

import api from "../helpers/api";
import signupIllustration from "../images/signup_illustration.svg";

import AuthLayout from "../layouts/AuthLayout";

const Signup = () => {
  const navigate = useNavigate();

  const register = async (values) => {
    const { first_name, last_name, email, password } = values;
    const { data } = await api.post("/signup", {
      first_name,
      last_name,
      email,
      password,
    });

    const { data: newUser, meta } = data;

    if (meta.code === 200) {
      return navigate("/login");
    }

    message.error(meta.message);
  };

  return (
    <AuthLayout illustration={signupIllustration}>
      <div style={{ textAlign: "center", width: "min(25vw, 400px)" }}>
        <Form onFinish={register} autoComplete="off">
          <h1>Sign Up</h1>
          <h4 style={{ color: "#8C8C8C", marginBottom: "20px" }}>
            Welcome to E-Learning App
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
            <Input className="form-input" placeholder="First Name" />
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
            <Input className="form-input" placeholder="Last Name" />
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
            <Input className="form-input" placeholder="Email Address" />
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
            Register
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
              Already have an account?
            </h4>
          </Col>
          <Col>
            <Link to="/login">
              <Button type="link" style={{ padding: 0 }}>
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
