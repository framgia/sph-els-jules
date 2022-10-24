import { Fragment } from "react";
import { useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { Button, Divider, Spin, Table, Typography } from "antd";
import urlParse from "url-parse";

import HomeLayout from "../../../shared/layouts/HomeLayout";
import ActionButton from "../../../shared/components/ActionButton";

import { useWords } from "./hooks/useWords";

const { Text } = Typography;

const Words = () => {
  const location = useLocation();
  const { query } = urlParse(location.search, true);
  const { loading, onEditClick, onDeleteClick, renderData } = useWords(
    query.lesson_id
  );
  const { currentLesson } = useSelector((state) => state.lesson);

  const columns = [
    {
      title: "Word",
      dataIndex: "word",
      key: "word",
      render: (text) => (
        <Text strong className="text-3xl">
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
              onClick={() => {
                onDeleteClick(record.key);
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
          <div className="mb-4">
            <Text strong className="text-2xl">
              {currentLesson?.title}
            </Text>
            <Link to={`/admin/lesson/word?lesson_id=${currentLesson?.id}`}>
              <Button
                className="float-right bg-[theme(colors.primary)]"
                type="primary"
              >
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
