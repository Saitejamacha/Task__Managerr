import axiosInstance from "./axiosConfig";

export const createTask = async (taskData) => {
  const response = await axiosInstance.post("/tasks", taskData);
  return response.data;
};

export const getAllTasks = async () => {
  const response = await axiosInstance.get("/tasks");
  return response.data;
};

export const getTaskById = async (taskId) => {
  const response = await axiosInstance.get(`/tasks/${taskId}`);
  return response.data;
};

export const updateTask = async (taskId, taskData) => {
  const response = await axiosInstance.put(`/tasks/${taskId}`, taskData);
  return response.data;
};

export const deleteTask = async (taskId) => {
  const response = await axiosInstance.delete(`/tasks/${taskId}`);
  return response.data;
};

export const updateTaskStatus = async (taskId, status) => {
  const response = await axiosInstance.patch(`/tasks/${taskId}/status`, {
    status,
  });
  return response.data;
};

export const filterTasksByStatus = async (status) => {
  const response = await axiosInstance.get(`/tasks/filter/status/${status}`);
  return response.data;
};

export const filterTasksByDate = async (date) => {
  const response = await axiosInstance.get(`/tasks/filter/date/${date}`);
  return response.data;
};
