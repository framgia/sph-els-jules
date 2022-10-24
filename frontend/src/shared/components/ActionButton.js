import { Button, Popconfirm, Typography } from "antd";

const { Text } = Typography;

const ActionButton = ({ action, disable = true, onClick }) => {
  return (
    <Popconfirm
      title="Are you sure to delete this item?"
      onConfirm={onClick}
      okText="Yes"
      okType="danger"
      cancelText="No"
      disabled={disable}
    >
      <Button className="px-0" onClick={disable && onClick} type="link">
        <Text underline className="text-inherit">
          {action}
        </Text>
      </Button>
    </Popconfirm>
  );
};

export default ActionButton;
