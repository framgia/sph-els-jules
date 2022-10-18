import { useSelector } from "react-redux";
import { Card, Empty, List, Spin } from "antd";

import HomeLayout from "../../../shared/layouts/HomeLayout";
import SearchAdmin from "./components/SearchAdmin";
import AdminListItems from "./components/AdminListItems";

import { useAdmins } from "./hooks/useAdmins";

import styles from "./Admins.module.css";

const Admins = () => {
  const { user: currentUser } = useSelector((state) => state.currentUser);
  const { loading, filteredAdmins, searchText, setSearchText, filterUsers } =
    useAdmins();

  return (
    <HomeLayout pageTitle="Admins">
      <SearchAdmin
        searchText={searchText}
        setSearchText={setSearchText}
        filterUsers={filterUsers}
      />
      {loading ? (
        <Spin />
      ) : (
        <Card>
          <List className={styles.adminList}>
            {filteredAdmins.length ? (
              filteredAdmins.map((admin) => {
                const isCurrentUser = currentUser.id === admin.id;
                return (
                  <AdminListItems
                    key={admin.id}
                    admin={admin}
                    isCurrentUser={isCurrentUser}
                  />
                );
              })
            ) : (
              <Empty />
            )}
          </List>
        </Card>
      )}
    </HomeLayout>
  );
};

export default Admins;
