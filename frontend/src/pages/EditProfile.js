import React, { useState, useEffect } from "react";

import { blue } from "@ant-design/colors";
import {
  Row,
  Col,
  Card,
  Avatar,
  Form,
  Input,
  Empty,
  Button,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { authenticate } from "../helpers/auth";
import { editUserProfile } from "../helpers/api";
import { checkFileUpload, isValidFile } from "../helpers/imageHelper";
import { setCurrentUser } from "../store/currentUserSlice";
import HomeLayout from "../layouts/HomeLayout";

const EditProfile = () => {
  const { user } = useSelector((state) => state.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [avatarUrl, setAvatarUrl] = useState(undefined);
  const [selectedImg, setSelectedImg] = useState("");

  useEffect(() => {
    authenticate(navigate, dispatch);
    if (!user.id) return;

    setSelectedImg(user.avatar_url);
  }, [dispatch, navigate, user.id, user.avatar_url]);

  const uploadProps = {
    name: "file",
    showUploadList: false,
    beforeUpload: (info) => {
      checkFileUpload(info, message);
    },
    customRequest: (info) => {
      const { file } = info;

      if (isValidFile(file)) {
        setAvatarUrl(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (result) => {
          setSelectedImg(result.target.result);
        };
      }
    },
  };

  return (
    <HomeLayout>
      <h1>Edit Profile</h1>
      {user.id ? (
        <Form
          layout="vertical"
          initialValues={{
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
          }}
          onFinish={async (values) => {
            const {
              first_name,
              last_name,
              email,
              current_password,
              new_password,
            } = values;

            const reqBody = {};
            if (first_name !== user.first_name) reqBody.first_name = first_name;
            if (last_name !== user.last_name) reqBody.last_name = last_name;
            if (email !== user.email) reqBody.email = email;
            if (current_password) reqBody.current_password = current_password;
            if (new_password) reqBody.new_password = new_password;
            if (avatarUrl && avatarUrl !== user.avatar_url)
              reqBody.avatar_url = avatarUrl;

            if (!Object.values(reqBody).some((value) => value !== undefined)) {
              message.error("Profile not updated. No changes made.");
              return;
            }
            const data = await editUserProfile(user.id, reqBody);
            if (data.meta.code === 200) {
              message.success("Profile successfully updated!");
              localStorage.setItem("user", JSON.stringify(data.data.user));
              dispatch(setCurrentUser(data.data.user));
              return;
            }

            message.error(data.meta.message);
          }}
        >
          <Row gutter={24}>
            <Col span={8}>
              <Card style={{ marginBottom: "1em" }}>
                <Avatar
                  src={selectedImg}
                  shape="square"
                  style={{
                    backgroundColor: blue[0],
                    width: "100%",
                    height: "auto",
                    aspectRatio: "1 / 1",
                    marginBottom: "1em",
                  }}
                />
                <Form.Item label="Avatar URL">
                  <Input
                    value={avatarUrl?.name || user.avatar_url}
                    className="form-input"
                    disabled
                  />
                </Form.Item>
                <div
                  style={{
                    width: "100%",
                    textAlign: "end",
                  }}
                >
                  <Upload {...uploadProps}>
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                </div>
              </Card>
              <Button
                style={{ width: "100%" }}
                htmlType="submit"
                type="primary"
              >
                Save Profile
              </Button>
            </Col>
            <Col span={16}>
              <Card>
                <Form.Item
                  label="First Name"
                  name="first_name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your first name!",
                    },
                  ]}
                >
                  <Input className="form-input" />
                </Form.Item>

                <Form.Item
                  label="Last Name"
                  name="last_name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your last name!",
                    },
                  ]}
                >
                  <Input className="form-input" placeholder="Last Name" />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input className="form-input" placeholder="Email Address" />
                </Form.Item>
                <Form.Item label="Current password" name="current_password">
                  <Input.Password
                    className="form-input"
                    placeholder="Current password"
                  />
                </Form.Item>
                <Form.Item label="New password" name="new_password">
                  <Input.Password
                    className="form-input"
                    placeholder="New password"
                  />
                </Form.Item>
              </Card>
            </Col>
          </Row>
        </Form>
      ) : (
        <Card>
          <Empty />
        </Card>
      )}
    </HomeLayout>
  );
};

export default EditProfile;
