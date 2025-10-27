import api from "./axios";

export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  getMe: () => api.get("/auth/me"),
  updateProfile: (data) => api.put("/auth/updatedetails", data),
  logout: () => api.post("/auth/logout"),
};

export const questionAPI = {
  getAll: (params) => api.get("/questions", { params }),
  getOne: (id) => api.get(`/questions/${id}`),
  create: (data) => api.post("/questions", data),
  update: (id, data) => api.put(`/questions/${id}`, data),
  delete: (id) => api.delete(`/questions/${id}`),
  upvote: (id) => api.put(`/questions/${id}/upvote`),
};

export const answerAPI = {
  getByQuestion: (questionId) => api.get(`/answers/question/${questionId}`),
  create: (data) => api.post("/answers", data),
  vote: (id, vote) => api.put(`/answers/${id}/vote`, { vote }),
  verify: (id) => api.put(`/answers/${id}/verify`),
};

export const sessionAPI = {
  getAll: (params) => api.get("/sessions", { params }),
  getOne: (id) => api.get(`/sessions/${id}`),
  create: (data) => api.post("/sessions", data),
  join: (id) => api.put(`/sessions/${id}/join`),
};

export const chatbotAPI = {
  chat: (message, context) => api.post("/chatbot", { message, context }),
  getHistory: () => api.get("/chatbot/history"),
};

export const reportAPI = {
  create: (data) => api.post("/reports", data),
};
