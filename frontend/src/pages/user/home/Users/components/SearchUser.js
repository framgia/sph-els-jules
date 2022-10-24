import { Input } from "antd";

const SearchUser = ({ searchText, setSearchText, filterUsers }) => {
  return (
    <div className="mb-4">
      <Input
        className="input-text w-60"
        placeholder="Search by name or email"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          filterUsers(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchUser;
