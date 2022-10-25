import API from "./baseApi";

const userApi = {
  getUsers: (payload) => {
    const options = {
      method: "GET",
      url: "/users",
      params: { ...payload },
    };

    return API.request(options);
  },
  getUserById: async (payload, callback) => {
    const options = {
      method: "GET",
      url: "/users/id",
      params: { ...payload },
    };

    const { data } = await API.request(options);
    return callback(data);
  },
  getUserFeed: async (payload, callback) => {
    const options = {
      method: "GET",
      url: "/users/activity-logs",
      params: { ...payload },
    };

    const { data } = await API.request(options);
    return callback(data);
  },
  getLearnings: async (payload, callback) => {
    const options = {
      method: "GET",
      url: "/users/learn-count",
      params: { ...payload },
    };

    const { data } = await API.request(options);
    return callback(data);
  },
  getUserProfile: async (payload, callback) => {
    const options = {
      method: "GET",
      url: "/users/profile",
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
      headers: { "Content-Type": "multipart/form-data" },
      data: { ...payload },
    };

    const { data } = await API.request(options);
    return data;
  },
  toggleFollow: async (payload) => {
    const options = {
      method: "POST",
      url: "/users/toggle-follow",
      data: { ...payload },
    };

    const { data } = await API.request(options);
    return data;
  },
};

export default userApi;
