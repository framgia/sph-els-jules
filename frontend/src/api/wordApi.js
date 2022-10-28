import API from "./baseApi";

const accessToken = localStorage.getItem("accessToken");

const wordApi = {
  getWordsLearned: (payload) => {
    const options = {
      method: "GET",
      url: "/words/user",
      headers: { Authorization: accessToken },
      params: { ...payload },
    };

    return API.request(options);
  },
};

export default wordApi;
