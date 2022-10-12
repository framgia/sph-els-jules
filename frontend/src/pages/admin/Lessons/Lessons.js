import { Fragment } from "react";
import { Button, Divider, Table, Typography } from "antd";

import HomeLayout from "../../../shared/layouts/HomeLayout";

import { useLessons } from "./hooks/useLessons";

import styles from "./Lessons.module.css";

const { Text } = Typography;

const Lessons = () => {
  const { renderData } = useLessons();

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
      render: (_, record) => (
        <Fragment>
          <Button className={styles.actions} type="link">
            <Text underline className={styles.text}>
              Add Word
            </Text>
          </Button>
          <Divider type="vertical" className={styles.divider} />
          <Button className={styles.actions} type="link">
            <Text underline className={styles.text}>
              Edit
            </Text>
          </Button>
          <Divider type="vertical" className={styles.divider} />
          <Button className={styles.actions} type="link">
            <Text underline className={styles.text}>
              Delete
            </Text>
          </Button>
        </Fragment>
      ),
    },
  ];

  return (
    <HomeLayout pageTitle="Lessons">
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
