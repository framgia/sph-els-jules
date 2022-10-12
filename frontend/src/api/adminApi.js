import API from "./baseApi";

const adminLessonApi = {
  getLessons: () => {
    const options = {
      method: "GET",
      url: "/admin/lessons",
    };

    return API.request(options);
  },
};

export default adminLessonApi;
