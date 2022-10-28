import API from "./baseApi";

const accessToken = localStorage.getItem("accessToken");

const resultApi = {
  getResults: async (payload, callback) => {
    const options = {
      method: "GET",
      url: "/results/lesson",
      headers: { Authorization: accessToken },
      params: { ...payload },
    };

    const { data } = await API.request(options);
    callback(data);
  },
  createResult: async (payload) => {
    const options = {
      method: "POST",
      url: "/results",
      headers: { Authorization: accessToken },
      data: { ...payload },
    };

    return await API.request(options);
  },
};

export default resultApi;
