import {
  setTasks,
  addTask,
  updateTask,
  deleteTask,
  setLoading,
  setError,
} from "./tasksSlice";
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask as updateTaskApi,
  deleteTask as deleteTaskApi,
  updateTaskStatus,
  filterTasksByStatus,
  filterTasksByDate,
} from "../../api/taskService";

export const fetchAllTasks = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const tasks = await getAllTasks();
    dispatch(setTasks(tasks));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
    dispatch(setLoading(false));
    throw error;
  }
};

export const addNewTask = (taskData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const task = await createTask(taskData);
    dispatch(addTask(task));
    dispatch(setLoading(false));
    return task;
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
    dispatch(setLoading(false));
    throw error;
  }
};

export const editTask = (taskId, taskData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const task = await updateTaskApi(taskId, taskData);
    dispatch(updateTask(task));
    dispatch(setLoading(false));
    return task;
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
    dispatch(setLoading(false));
    throw error;
  }
};

export const removeTask = (taskId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await deleteTaskApi(taskId);
    dispatch(deleteTask(taskId));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
    dispatch(setLoading(false));
    throw error;
  }
};

export const changeTaskStatus = (taskId, status) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const task = await updateTaskStatus(taskId, status);
    dispatch(updateTask(task));
    dispatch(setLoading(false));
    return task;
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
    dispatch(setLoading(false));
    throw error;
  }
};

export const filterByStatus = (status) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const tasks = await filterTasksByStatus(status);
    dispatch(setTasks(tasks));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
    dispatch(setLoading(false));
    throw error;
  }
};

export const filterByDate = (date) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const tasks = await filterTasksByDate(date);
    dispatch(setTasks(tasks));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
    dispatch(setLoading(false));
    throw error;
  }
};
