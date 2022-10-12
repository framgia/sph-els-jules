import API from "./baseApi";

const resultApi = {
  getResults: async (payload, callback) => {
    const options = {
      method: "GET",
      url: "/results/lesson",
      params: { ...payload },
    };

    const { data } = await API.request(options);
    callback(data);
  },
};

export default resultApi;
