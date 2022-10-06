import { useSelector } from "react-redux";
import {
  Avatar,
  Button,
  Card,
  Col,
  Empty,
  Form,
  Input,
  message,
  Row,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

import HomeLayout from "../../../../shared/layouts/HomeLayout";

import { checkFileUpload, isValidFile } from "../../../../helpers/imageHelper";
import { useEditProfile } from "./hooks/useEditProfile";

import styles from "./EditProfile.module.css";

const EditProfile = () => {
  const { user } = useSelector((state) => state.currentUser);
  const { avatarUrl, selectedImg, setAvatarUrl, setSelectedImg, saveProfile } =
    useEditProfile();

  return (
    <HomeLayout pageTitle="Edit Profile">
      {user.id ? (
        <Form
          layout="vertical"
          initialValues={{
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
          }}
          onFinish={saveProfile}
        >
          <Row gutter={24}>
            <Col span={8}>
              <Card style={{ marginBottom: "1em" }}>
                <Avatar
                  className={styles.userAvatar}
                  src={selectedImg}
                  shape="square"
                />
                <Form.Item label="Avatar URL">
                  <Input
                    value={avatarUrl?.name || user.avatar_url}
                    className="form-input"
                    disabled
                  />
                </Form.Item>
                <div className={styles.uploadBtn}>
                  <Upload
                    name="file"
                    showUploadList={false}
                    beforeUpload={(info) => {
                      checkFileUpload(info, message);
                    }}
                    customRequest={(info) => {
                      const { file } = info;

                      if (isValidFile(file)) {
                        setAvatarUrl(file);
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = (result) => {
                          setSelectedImg(result.target.result);
                        };
                      }
                    }}
                  >
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
