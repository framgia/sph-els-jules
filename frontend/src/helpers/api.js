import axios from "axios";

const { REACT_APP_BACKEND_URL } = process.env;

const api = axios.create({
  baseURL: REACT_APP_BACKEND_URL,
  timeout: 1000,
});

export const getUsers = async (cb) => {
  const { data } = await api.get("/users");

  cb(data);
  return data;
};

export const getUserById = async (id, cb) => {
  const { data } = await api.get("/users/id", { params: { id } });

  cb(data);
  return data;
};

export const getUserFeed = async (user_id, setUserFeed) => {
  const { data } = await api.get("/users/activity-logs", {
    params: {
      user_id,
    },
  });
  setUserFeed(data.data.activity_logs);
};

export const getLearnings = async (user_id, setLearnings) => {
  const { data } = await api.get("/users/learn-count/", {
    params: {
      user_id,
    },
  });
  setLearnings(data.data);
};

export const getUserProfile = async (user_id, setUserProfile) => {
  const { data } = await api.get("/users/profile", {
    params: {
      user_id,
    },
  });
  const {
    data: { followers, following, activity_logs },
  } = data;

  setUserProfile(followers, following, activity_logs);
};

export const editUserProfile = async (user_id, reqBody) => {
  const formData = new FormData();
  formData.append("user_id", user_id);

  for (let key in reqBody) {
    formData.append(key, reqBody[key]);
  }

  const { data } = await api.put("/users/profile", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data;
};

export const toggleFollow = async (follower_id, following_id) => {
  const { data } = await api.post("/users/toggle-follow", {
    follower_id,
    following_id,
  });
  return data;
};

export default api;
