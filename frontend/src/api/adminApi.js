import API from "./baseApi";

const adminApi = {
  getLessons: () => {
    const options = {
      method: "GET",
      url: "/admin/lessons",
    };

    return API.request(options);
  },
  getLessonById: (payload) => {
    const options = {
      method: "GET",
      url: "/admin/lessons/id",
      params: { ...payload },
    };

    return API.request(options);
  },
  createLesson: (payload) => {
    const options = {
      method: "POST",
      url: "/admin/lessons",
      data: { ...payload },
    };

    return API.request(options);
  },
  updateLessonById: (params, data) => {
    const options = {
      method: "PUT",
      url: "/admin/lessons/update/id",
      params,
      data,
    };

    return API.request(options);
  },
  deleteLessonById: (payload) => {
    const options = {
      method: "DELETE",
      url: "/admin/lessons/delete/id",
      params: { ...payload },
    };

    return API.request(options);
  },
};

export default adminApi;
