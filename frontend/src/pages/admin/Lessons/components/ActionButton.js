import { Button, Popconfirm, Typography } from "antd";

import styles from "../Lessons.module.css";

const { Text } = Typography;

const ActionButton = ({ action, disable = true, onClick }) => {
  return (
    <Popconfirm
      title="Are you sure to delete this lesson?"
      onConfirm={onClick}
      okText="Yes"
      cancelText="No"
      disabled={disable}
    >
      <Button
        className={styles.actions}
        onClick={disable && onClick}
        type="link"
      >
        <Text underline className={styles.text}>
          {action}
        </Text>
      </Button>
    </Popconfirm>
  );
};

export default ActionButton;
