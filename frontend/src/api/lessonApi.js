import API from "./baseApi";

const accessToken = localStorage.getItem("accessToken");

const lessonApi = {
  getLessons: (payload) => {
    const options = {
      method: "GET",
      url: "/lessons",
      headers: { Authorization: accessToken },
      params: { ...payload },
    };

    return API.request(options);
  },
};

export default lessonApi;
