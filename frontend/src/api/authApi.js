import API from "./baseApi";

const authApi = {
  login: (payload) => {
    const options = {
      method: "POST",
      url: "/login",
      data: { ...payload },
    };

    return API.request(options);
  },
  signup: (payload) => {
    const options = {
      method: "POST",
      url: "/signup",
      data: { ...payload },
    };
    return API.request(options);
  },
};

export default authApi;
