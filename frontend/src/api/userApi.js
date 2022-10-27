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
  getUserFeed: (payload) => {
    const options = {
      method: "GET",
      url: "/users/activity-logs",
      params: { ...payload },
    };

    return API.request(options);
  },
  getLearnings: (payload) => {
    const options = {
      method: "GET",
      url: "/users/learn-count",
      params: { ...payload },
    };

    return API.request(options);
  },
  getUserProfile: (payload) => {
    const options = {
      method: "GET",
      url: "/users/profile",
      params: { ...payload },
    };

    return API.request(options);
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
