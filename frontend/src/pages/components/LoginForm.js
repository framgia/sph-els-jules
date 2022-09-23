import React from "react";

import { blue } from "@ant-design/colors";
import {
  BoxPlotTwoTone,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { Row, Col, Button, Form, Input, Avatar, message } from "antd";
import { useNavigate } from "react-router-dom";

import api from "../../helpers/api";

const LoginForm = () => {
  const navigate = useNavigate();

  const login = async (values) => {
    const { email, password } = values;
    const { data } = await api.post("/login", { email, password });
    const { data: userData, meta } = data;

    if (meta.code === 200) {
      localStorage.setItem("user", JSON.stringify(userData.user));
      return navigate("/");
    }

    message.error(meta.message);
  };

  return (
    <div style={{ textAlign: "center", width: "min(25vw, 400px)" }}>
      <Form onFinish={login} autoComplete="off">
        <Avatar
          style={{ margin: "center", backgroundColor: blue[0] }}
          size={64}
          icon={<BoxPlotTwoTone />}
        />
        <h1>Sign In</h1>
        <h4 style={{ color: "#8c8c8c", marginBottom: "20px" }}>
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
          className="form-input"
          type="primary"
          htmlType="submit"
          style={{ height: "3em" }}
          block
        >
          Login
        </Button>
      </Form>
      <Row style={{ marginTop: "10px" }} gutter={5}>
        <Col className="center">
          <h4
            style={{
              color: "#8c8c8c",
              marginBottom: 0,
            }}
          >
            Don't have an account yet?
          </h4>
        </Col>
        <Col>
          <Button type="link" style={{ padding: 0 }}>
            Sign Up!
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default LoginForm;
