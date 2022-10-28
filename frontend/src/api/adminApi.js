import API from "./baseApi";

const accessToken = localStorage.getItem("accessToken");

const adminApi = {
  // Admins
  getAdmins: (payload) => {
    const options = {
      method: "GET",
      url: "/admins",
      params: { ...payload },
    };

    return API.request(options);
  },

  // Lessons
  getLessons: (payload) => {
    const options = {
      method: "GET",
      url: "/admin/lessons",
      headers: { Authorization: accessToken },
      params: { ...payload },
    };

    return API.request(options);
  },
  getLessonById: (payload) => {
    const options = {
      method: "GET",
      url: "/admin/lessons/id",
      headers: { Authorization: accessToken },
      params: { ...payload },
    };

    return API.request(options);
  },
  createLesson: (payload) => {
    const options = {
      method: "POST",
      url: "/admin/lessons",
      headers: { Authorization: accessToken },
      data: { ...payload },
    };

    return API.request(options);
  },
  updateLessonById: (params, data) => {
    const options = {
      method: "PUT",
      url: "/admin/lessons/update/id",
      headers: { Authorization: accessToken },
      params,
      data,
    };

    return API.request(options);
  },
  deleteLessonById: (payload) => {
    const options = {
      method: "DELETE",
      url: "/admin/lessons/delete/id",
      headers: { Authorization: accessToken },
      params: { ...payload },
    };

    return API.request(options);
  },

  // Words
  getWordsByLessonId: (payload) => {
    const options = {
      method: "GET",
      url: "/admin/words",
      headers: { Authorization: accessToken },
      params: { ...payload },
    };

    return API.request(options);
  },
  getWordById: (payload) => {
    const options = {
      method: "GET",
      url: "/admin/words/id",
      headers: { Authorization: accessToken },
      params: { ...payload },
    };

    return API.request(options);
  },
  createWordByLessonId: (params, data) => {
    const options = {
      method: "POST",
      url: "/admin/words",
      headers: { Authorization: accessToken },
      params,
      data,
    };

    return API.request(options);
  },
  updateWordById: (params, data) => {
    const options = {
      method: "PUT",
      url: "/admin/words/update/id",
      headers: { Authorization: accessToken },
      params,
      data,
    };

    return API.request(options);
  },
  deleteWordById: (payload) => {
    const options = {
      method: "DELETE",
      url: "/admin/words/delete/id",
      headers: { Authorization: accessToken },
      params: { ...payload },
    };

    return API.request(options);
  },
};

export default adminApi;
