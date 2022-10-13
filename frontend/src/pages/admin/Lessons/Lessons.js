import { Fragment } from "react";
import { Button, Divider, Table, Typography } from "antd";
import { Link } from "react-router-dom";

import HomeLayout from "../../../shared/layouts/HomeLayout";
import ActionButton from "./components/ActionButton";

import { useLessons } from "./hooks/useLessons";

import styles from "./Lessons.module.css";

const { Text } = Typography;

const Lessons = () => {
  const { renderData, onEditClick, onDeleteClick } = useLessons();

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
            <ActionButton action="Words" />
            <Divider type="vertical" className={styles.divider} />
            <ActionButton
              action="Edit"
              onClick={() => {
                onEditClick(record.key);
              }}
            />
            <Divider type="vertical" className={styles.divider} />
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
      <div className={styles.pageHeader}>
        <Text strong style={{ fontSize: "1.6rem" }}>
          Lesson
        </Text>
        <Link to="/admin/lesson">
          <Button style={{ float: "right" }} type="primary">
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
