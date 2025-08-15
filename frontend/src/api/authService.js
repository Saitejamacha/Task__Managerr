import axiosInstance from "./axiosConfig";

export const register = async (userData) => {
  const response = await axiosInstance.post("/auth/register", userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await axiosInstance.post("/auth/login", credentials);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await axiosInstance.get("/auth/me");
  return response.data;
};

export const updateTimezone = async (timezone) => {
  const response = await axiosInstance.put("/auth/timezone", { timezone });
  return response.data;
};
