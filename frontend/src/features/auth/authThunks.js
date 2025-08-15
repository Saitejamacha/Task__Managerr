import { setCredentials, setLoading, setError } from "./authSlice";
import {
  register,
  login,
  getCurrentUser,
  updateTimezone,
} from "../../api/authService";

export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await register(userData);
    dispatch(
      setCredentials({
        user: response,
        token: response.token,
      })
    );
    dispatch(setLoading(false));
    return response;
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
    dispatch(setLoading(false));
    throw error;
  }
};

export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await login(credentials);
    dispatch(
      setCredentials({
        user: response,
        token: response.token,
      })
    );
    dispatch(setLoading(false));
    return response;
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
    dispatch(setLoading(false));
    throw error;
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const token = localStorage.getItem("token");
    if (token) {
      const response = await getCurrentUser();
      dispatch(
        setCredentials({
          user: response,
          token,
        })
      );
    }
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
    dispatch(setLoading(false));
    localStorage.removeItem("token");
  }
};

export const updateUserTimezone = (timezone) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await updateTimezone(timezone);
    dispatch(
      setCredentials({
        user: response,
        token: localStorage.getItem("token"),
      })
    );
    dispatch(setLoading(false));
    return response;
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
    dispatch(setLoading(false));
    throw error;
  }
};
