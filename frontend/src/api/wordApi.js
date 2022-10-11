import API from "./baseApi";

const wordApi = {
  getWordsLearned: (payload) => {
    const options = {
      method: "GET",
      url: "/words/user",
      params: { ...payload },
    };

    return API.request(options);
  },
  postAnswer: async (payload) => {
    const options = {
      method: "POST",
      url: "/results",
      data: { ...payload },
    };

    return await API.request(options);
  },
};

export default wordApi;
