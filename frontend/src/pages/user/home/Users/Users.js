import { useSelector } from "react-redux";
import { Card, Empty, List } from "antd";

import HomeLayout from "../../../../shared/layouts/HomeLayout";
import SearchUser from "./components/SearchUser";
import UserListItems from "./components/UserListItems.js";

import { useAllUser } from "./hooks/useAllUser";

import styles from "./Users.module.css";

const Users = () => {
  const { user: currentUser } = useSelector((state) => state.currentUser);
  const {
    filteredUsers,
    searchText,
    setSearchText,
    filterUsers,
    isFollowed,
    handleFollow,
  } = useAllUser();

  return (
    <HomeLayout pageTitle="Users">
      <SearchUser
        searchText={searchText}
        setSearchText={setSearchText}
        filterUsers={filterUsers}
      />
      <Card>
        <List className={styles.userList}>
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
      </Card>
    </HomeLayout>
  );
};

export default Users;