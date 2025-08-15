import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Divider,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
} from "@mui/icons-material";
import { changeTaskStatus, removeTask } from "../../features/tasks/tasksThunks";
import TaskForm from "./TaskForm";

const statusColors = {
  Pending: "default",
  "In Progress": "primary",
  Done: "success",
};

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const openMenu = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setOpenEdit(true);
    handleMenuClose();
  };

  const handleDelete = () => {
    dispatch(removeTask(task.id));
    handleMenuClose();
  };

  const toggleStatus = () => {
    const newStatus = task.status === "Done" ? "Pending" : "Done";
    dispatch(changeTaskStatus(task.id, newStatus));
  };

  return (
    <>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" alignItems="center">
              <IconButton onClick={toggleStatus}>
                {task.status === "Done" ? (
                  <CheckCircleIcon color="success" />
                ) : (
                  <RadioButtonUncheckedIcon />
                )}
              </IconButton>
              <Typography variant="h6" component="div" sx={{ ml: 1 }}>
                {task.title}
              </Typography>
            </Box>
            <Box>
              <Chip
                label={task.status}
                color={statusColors[task.status]}
                size="small"
                sx={{ mr: 1 }}
              />
              <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleMenuClick}
              >
                <MoreVertIcon />
              </IconButton>
            </Box>
          </Box>

          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={openMenu}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleEdit}>
              <EditIcon fontSize="small" sx={{ mr: 1 }} />
              Edit
            </MenuItem>
            <MenuItem onClick={handleDelete}>
              <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
              Delete
            </MenuItem>
          </Menu>

          {task.description && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 1, mb: 1 }}
            >
              {task.description}
            </Typography>
          )}

          <Divider sx={{ my: 1 }} />

          <Box display="flex" justifyContent="space-between">
            <Typography variant="caption" color="text.secondary">
              Created: {task.created_at}
            </Typography>
            {task.due_date && (
              <Typography
                variant="caption"
                color={
                  new Date(task.due_date) < new Date() && task.status !== "Done"
                    ? "error"
                    : "text.secondary"
                }
              >
                Due: {task.due_date}
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>

      <TaskForm
        open={openEdit}
        handleClose={() => setOpenEdit(false)}
        taskToEdit={task}
      />
    </>
  );
};

export default TaskItem;
