import { Button, Form, Input, message } from "antd";

const LessonDetailsForm = ({ lesson, onSubmit }) => {
  return (
    <Form
      layout="vertical"
      initialValues={{
        title: lesson?.title,
        description: lesson?.description,
      }}
      onFinish={(values) => {
        const { title, description } = values;

        onSubmit({ title, description }, !lesson);
      }}
      onFinishFailed={() => {
        message.warning("Please complete the form");
      }}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[
          {
            required: true,
            message: "Please input the lesson title",
          },
        ]}
      >
        <Input className="input-text" />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[
          {
            required: true,
            message: "Please input the lesson description",
          },
        ]}
      >
        <Input.TextArea className="input-text h-48" />
      </Form.Item>
      <Button
        type="primary"
        htmlType="submit"
        className="float-right w-32 bg-[theme(colors.primary)]"
      >
        Submit
      </Button>
    </Form>
  );
};

export default LessonDetailsForm;
