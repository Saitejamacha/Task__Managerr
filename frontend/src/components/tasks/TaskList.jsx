import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTasks } from "../../features/tasks/tasksThunks";
import TaskItem from "./TaskItem";
import { CircularProgress, Box, Typography } from "@mui/material";

const TaskList = () => {
  const dispatch = useDispatch();
  const { filteredTasks, isLoading, error } = useSelector(
    (state) => state.tasks
  );
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(fetchAllTasks());
    }
  }, [dispatch, user]);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (filteredTasks.length === 0) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <Typography variant="h6">No tasks found</Typography>
      </Box>
    );
  }

  return (
    <Box>
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </Box>
  );
};

export default TaskList;
