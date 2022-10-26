import API from "./baseApi";

const accessToken = localStorage.getItem("accessToken");

const userApi = {
  getUsers: (payload) => {
    const options = {
      method: "GET",
      url: "/users",
      headers: { Authorization: accessToken },
      params: { ...payload },
    };

    return API.request(options);
  },
  getUserById: async (payload, callback) => {
    const options = {
      method: "GET",
      url: "/users/id",
      headers: { Authorization: accessToken },
      params: { ...payload },
    };

    const { data } = await API.request(options);
    return callback(data);
  },
  getUserFeed: async (payload, callback) => {
    const options = {
      method: "GET",
      url: "/users/activity-logs",
      headers: { Authorization: accessToken },
      params: { ...payload },
    };

    const { data } = await API.request(options);
    return callback(data);
  },
  getLearnings: async (payload, callback) => {
    const options = {
      method: "GET",
      url: "/users/learn-count",
      headers: { Authorization: accessToken },
      params: { ...payload },
    };

    const { data } = await API.request(options);
    return callback(data);
  },
  getUserProfile: async (payload, callback) => {
    const options = {
      method: "GET",
      url: "/users/profile",
      headers: { Authorization: accessToken },
      params: { ...payload },
    };

    const { data } = await API.request(options);
    const {
      data: { followers, following, activity_logs },
    } = data;
    return callback(followers, following, activity_logs);
  },
  editUserProfile: async (payload) => {
    const options = {
      method: "PUT",
      url: "/users/profile",
      headers: {
        Authorization: accessToken,
        "Content-Type": "multipart/form-data",
      },
      data: { ...payload },
    };

    const { data } = await API.request(options);
    return data;
  },
  toggleFollow: async (payload) => {
    const options = {
      method: "POST",
      url: "/users/toggle-follow",
      headers: { Authorization: accessToken },
      data: { ...payload },
    };

    const { data } = await API.request(options);
    return data;
  },
};

export default userApi;
