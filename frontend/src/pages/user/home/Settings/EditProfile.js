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
              <Card className="mb-4">
                <Avatar
                  className="user-avatar mb-4"
                  src={selectedImg}
                  shape="square"
                />
                <Form.Item label="Avatar URL">
                  <Input
                    value={avatarUrl?.name || user.avatar_url}
                    className="input-text"
                    disabled
                  />
                </Form.Item>
                <div className="text-end">
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
                className="bg-[theme(colors.primary)]"
                htmlType="submit"
                type="primary"
                block
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
                  <Input className="input-text" />
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
                  <Input className="input-text" placeholder="Last Name" />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input className="input-text" placeholder="Email Address" />
                </Form.Item>
                <Form.Item label="Current password" name="current_password">
                  <Input.Password
                    className="input-text"
                    placeholder="Current password"
                  />
                </Form.Item>
                <Form.Item label="New password" name="new_password">
                  <Input.Password
                    className="input-text"
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
