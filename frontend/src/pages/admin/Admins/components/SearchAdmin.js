import { Input } from "antd";

const SearchAdmin = ({ searchText, setSearchText, filterUsers }) => {
  return (
    <div style={{ marginBottom: "1em" }}>
      <Input
        style={{ width: "250px" }}
        className="form-input"
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

export default SearchAdmin;
