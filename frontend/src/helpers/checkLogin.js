export const checkLogin = (navigate) => {
  const loggedInUser = localStorage.getItem("user");
  if (!loggedInUser) {
    return navigate("/login");
  }

  return JSON.parse(loggedInUser);
};
