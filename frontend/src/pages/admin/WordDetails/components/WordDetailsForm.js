import { Button, Col, Form, Input, message, Row } from "antd";

const WordDetailsForm = ({ word, onSubmit }) => {
  return (
    <Form
      layout="vertical"
      initialValues={{
        question: word?.question,
        correct_answer: word?.correct_answer,
        choice1: word?.choice1,
        choice2: word?.choice2,
        choice3: word?.choice3,
        choice4: word?.choice4,
      }}
      onFinish={(values) => {
        onSubmit(values, !word);
      }}
      onFinishFailed={() => {
        message.warning("Please complete the form");
      }}
    >
      <Form.Item
        label="Question"
        name="question"
        rules={[
          {
            required: true,
            message: "Please input the question",
          },
        ]}
      >
        <Input className="input-text" />
      </Form.Item>

      <Form.Item
        label="Correct Answer"
        name="correct_answer"
        rules={[
          {
            required: true,
            message: "Please input the correct answer",
          },
        ]}
      >
        <Input className="input-text" />
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Choice 1"
            name="choice1"
            rules={[
              {
                required: true,
                message: "Please input the 1st choice",
              },
            ]}
          >
            <Input className="input-text" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Choice 2"
            name="choice2"
            rules={[
              {
                required: true,
                message: "Please input the 2st choice",
              },
            ]}
          >
            <Input className="input-text" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Choice 3"
            name="choice3"
            rules={[
              {
                required: true,
                message: "Please input the 3st choice",
              },
            ]}
          >
            <Input className="input-text" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Choice 4"
            name="choice4"
            rules={[
              {
                required: true,
                message: "Please input the 4st choice",
              },
            ]}
          >
            <Input className="input-text" />
          </Form.Item>
        </Col>
      </Row>

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

export default WordDetailsForm;
