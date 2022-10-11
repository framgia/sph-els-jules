import API from "./baseApi";

const lessonApi = {
  getLessons: (payload) => {
    const options = {
      method: "GET",
      url: "/lessons",
      params: { ...payload },
    };

    return API.request(options);
  },
};

export default lessonApi;
