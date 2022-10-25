import { useSelector } from "react-redux";
import { Card, Empty, List, Pagination, Spin } from "antd";

import HomeLayout from "../../../shared/layouts/HomeLayout";
import SearchAdmin from "./components/SearchAdmin";
import AdminListItems from "./components/AdminListItems";

import { useAdmins } from "./hooks/useAdmins";

const Admins = () => {
  const { loading, user: currentUser } = useSelector(
    (state) => state.currentUser
  );
  const {
    adminsMeta,
    filteredAdmins,
    searchText,
    changePage,
    setSearchText,
    filterUsers,
  } = useAdmins();

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
          <List className="mb-4 h-[max(60vh,200px)] overflow-auto px-4">
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
          <Pagination
            showSizeChanger
            pageSizeOptions={[5, 10, 20, 50]}
            total={adminsMeta?.count}
            current={adminsMeta?.page}
            pageSize={adminsMeta?.limit || 5}
            onChange={(page, pageSize) => {
              changePage(page, pageSize);
            }}
            showTotal={(total, range) => {
              return `${range[0]}-${range[1]} of ${total} items`;
            }}
          />
        </Card>
      )}
    </HomeLayout>
  );
};

export default Admins;
