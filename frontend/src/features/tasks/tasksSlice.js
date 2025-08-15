import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  filteredTasks: [],
  isLoading: false,
  error: null,
  currentFilter: "all",
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
      state.filteredTasks = action.payload;
      state.currentFilter = "all";
    },
    addTask: (state, action) => {
      state.tasks.unshift(action.payload);
      if (
        state.currentFilter === "all" ||
        state.currentFilter === action.payload.status
      ) {
        state.filteredTasks.unshift(action.payload);
      }
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;

        const filteredIndex = state.filteredTasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (filteredIndex !== -1) {
          if (
            state.currentFilter === "all" ||
            state.currentFilter === action.payload.status
          ) {
            state.filteredTasks[filteredIndex] = action.payload;
          } else {
            state.filteredTasks.splice(filteredIndex, 1);
          }
        }
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      state.filteredTasks = state.filteredTasks.filter(
        (task) => task.id !== action.payload
      );
    },
    filterTasks: (state, action) => {
      state.currentFilter = action.payload.filter;
      if (action.payload.filter === "all") {
        state.filteredTasks = state.tasks;
      } else if (action.payload.filter === "date") {
        state.filteredTasks = state.tasks.filter(
          (task) =>
            task.due_date && task.due_date.includes(action.payload.value)
        );
      } else {
        state.filteredTasks = state.tasks.filter(
          (task) => task.status === action.payload.filter
        );
      }
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setTasks,
  addTask,
  updateTask,
  deleteTask,
  filterTasks,
  setLoading,
  setError,
  clearError,
} = tasksSlice.actions;

export default tasksSlice.reducer;
