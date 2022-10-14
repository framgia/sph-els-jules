import API from "./baseApi";

const adminApi = {
  // Lessons
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

  // Words
  getWordsByLessonId: (payload) => {
    const options = {
      method: "GET",
      url: "/admin/words",
      params: { ...payload },
    };

    return API.request(options);
  },
  getWordById: (payload) => {
    const options = {
      method: "GET",
      url: "/admin/words/id",
      params: { ...payload },
    };

    return API.request(options);
  },
  createWordByLessonId: (params, data) => {
    const options = {
      method: "POST",
      url: "/admin/words",
      params,
      data,
    };

    return API.request(options);
  },
  updateWordById: (params, data) => {
    const options = {
      method: "PUT",
      url: "/admin/words/update/id",
      params,
      data,
    };

    return API.request(options);
  },
  deleteWordById: (payload) => {
    const options = {
      method: "DELETE",
      url: "/admin/words/delete/id",
      params: { ...payload },
    };

    return API.request(options);
  },
};

export default adminApi;
