import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import { Button, Divider, Spin, Table, Typography } from "antd";
import { Link } from "react-router-dom";
import urlParse from "url-parse";

import HomeLayout from "../../../shared/layouts/HomeLayout";
import ActionButton from "../../../shared/components/ActionButton";

import { useWords } from "./hooks/useWords";

import styles from "./Words.module.css";

const { Text } = Typography;

const Words = () => {
  const location = useLocation();
  const { query } = urlParse(location.search, true);
  const { loading, renderData } = useWords(query.lesson_id);

  const columns = [
    {
      title: "Word",
      dataIndex: "word",
      key: "word",
      render: (text) => (
        <Text strong style={{ fontSize: "2rem" }}>
          {text}
        </Text>
      ),
      width: "80%",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        return (
          <Fragment>
            <ActionButton
              action="Edit"
              onClick={() => {
                // TODO: onEditClick(record.key);
              }}
            />
            <Divider type="vertical" className={styles.divider} />
            <ActionButton
              action="Delete"
              disable={false}
              onClick={() => {
                // TODO: onDeleteClick(record.key)
              }}
            />
          </Fragment>
        );
      },
    },
  ];
  return (
    <HomeLayout>
      {loading ? (
        <Spin />
      ) : (
        <Fragment>
          <div className={styles.pageHeader}>
            <Text strong style={{ fontSize: "1.6rem" }}>
              Words
            </Text>
            <Link to="/admin/word">
              <Button style={{ float: "right" }} type="primary">
                Add Word
              </Button>
            </Link>
          </div>
          <Table
            bordered
            dataSource={renderData()}
            columns={columns}
            pagination={false}
          />
        </Fragment>
      )}
    </HomeLayout>
  );
};

export default Words;
