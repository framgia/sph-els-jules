import { Col, Image } from "antd";
import { blue } from "@ant-design/colors";

const AuthIllustration = ({ illustration }) => {
  return (
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
        src={illustration}
        alt="log in or sign up"
      />
    </Col>
  );
};

export default AuthIllustration;
