import { useSelector } from "react-redux";
import { Card, Empty, List, Spin } from "antd";

import HomeLayout from "../../../shared/layouts/HomeLayout";
import SearchAdmin from "./components/SearchAdmin";
import AdminListItems from "./components/AdminListItems";

import { useAdmins } from "./hooks/useAdmins";

const Admins = () => {
  const { loading, user: currentUser } = useSelector(
    (state) => state.currentUser
  );
  const { filteredAdmins, searchText, setSearchText, filterUsers } =
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
          <List className="h-[max(60vh,200px)] overflow-auto px-4">
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
