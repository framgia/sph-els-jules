import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Card, Empty, List, Pagination, Spin } from "antd";

import HomeLayout from "../../../../shared/layouts/HomeLayout";
import SearchUser from "./components/SearchUser";
import UserListItems from "./components/UserListItems.js";

import { useAllUser } from "./hooks/useAllUser";

const Users = () => {
  const { loading, user: currentUser } = useSelector(
    (state) => state.currentUser
  );
  const {
    usersMeta,
    filteredUsers,
    searchText,
    changePage,
    setSearchText,
    filterUsers,
    isFollowed,
    handleFollow,
  } = useAllUser();

  return (
    <HomeLayout pageTitle="Users">
      {loading ? (
        <Spin />
      ) : (
        <Fragment>
          <SearchUser
            searchText={searchText}
            setSearchText={setSearchText}
            filterUsers={filterUsers}
          />
          <Card>
            <List className="mb-4 h-[max(60vh,200px)] overflow-auto px-4">
              {filteredUsers.length ? (
                filteredUsers.map((user) => {
                  const isUserFollowed = isFollowed(user.id);
                  const isCurrentUser = currentUser.id === user.id;
                  return (
                    <UserListItems
                      key={user.id}
                      user={user}
                      isCurrentUser={isCurrentUser}
                      isUserFollowed={isUserFollowed}
                      handleFollow={handleFollow}
                    />
                  );
                })
              ) : (
                <Empty />
              )}
            </List>
            <Pagination
              showSizeChanger
              pageSizeOptions={[5, 10, 20, 50]}
              total={usersMeta?.count}
              current={usersMeta?.page}
              pageSize={usersMeta?.limit || 5}
              onChange={(page, pageSize) => {
                changePage(page, pageSize);
              }}
              showTotal={(total, range) => {
                return `${range[0]}-${range[1]} of ${total} items`;
              }}
            />
          </Card>
        </Fragment>
      )}
    </HomeLayout>
  );
};

export default Users;
