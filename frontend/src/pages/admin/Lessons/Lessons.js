import { Fragment } from "react";
import { Button, Divider, Table, Typography } from "antd";
import { Link } from "react-router-dom";

import HomeLayout from "../../../shared/layouts/HomeLayout";
import ActionButton from "../../../shared/components/ActionButton";

import { useLessons } from "./hooks/useLessons";

const { Text } = Typography;

const Lessons = () => {
  const { renderData, onWordsClick, onEditClick, onDeleteClick } = useLessons();

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <Text strong>{text}</Text>,
      width: "15%",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "60%",
    },
    {
      title: "Action",
      key: "action",
      width: "25%",
      render: (_, record) => {
        return (
          <Fragment>
            <ActionButton
              action="Words"
              onClick={() => {
                onWordsClick(record.key);
              }}
            />
            <Divider
              type="vertical"
              className="border-left border-solid border-slate-300"
            />
            <ActionButton
              action="Edit"
              onClick={() => {
                onEditClick(record.key);
              }}
            />
            <Divider
              type="vertical"
              className="border-left border-solid border-slate-300"
            />
            <ActionButton
              action="Delete"
              disable={false}
              onClick={() => onDeleteClick(record.key)}
            />
          </Fragment>
        );
      },
    },
  ];

  return (
    <HomeLayout>
      <div className="mb-2">
        <Text strong className="text-2xl">
          Lesson
        </Text>
        <Link to="/admin/lesson">
          <Button
            className="float-right bg-[theme(colors.primary)]"
            type="primary"
          >
            Add Lesson
          </Button>
        </Link>
      </div>
      <Table
        bordered
        dataSource={renderData()}
        columns={columns}
        pagination={false}
      />
    </HomeLayout>
  );
};

export default Lessons;
