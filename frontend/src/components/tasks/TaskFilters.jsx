import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Menu,
  MenuItem,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import {
  FilterList as FilterListIcon,
  Today as TodayIcon,
} from "@mui/icons-material";
import {
  filterByStatus,
  filterByDate,
  fetchAllTasks,
} from "../../features/tasks/tasksThunks";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const TaskFilters = () => {
  const dispatch = useDispatch();
  const { currentFilter } = useSelector((state) => state.tasks);
  const [anchorEl, setAnchorEl] = useState(null);
  const [filterDate, setFilterDate] = useState(null);
  const open = Boolean(anchorEl);

  // Testing...

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Test
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStatusFilter = (status) => {
    if (status === "all") {
      dispatch(fetchAllTasks());
    } else {
      dispatch(filterByStatus(status));
    }
    handleClose();
  };

  const handleDateFilter = (date) => {
    if (date) {
      const formattedDate = date.toISOString().split("T")[0];
      dispatch(filterByDate(formattedDate));
    } else {
      dispatch(fetchAllTasks());
    }
  };

  return (
    <Box
      sx={{
        mb: 3,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant="h6">My Tasks</Typography>

      <Box>
        <Button
          startIcon={<FilterListIcon />}
          onClick={handleClick}
          sx={{ mr: 2 }}
        >
          Filter
        </Button>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Filter by date"
            value={filterDate}
            onChange={(newValue) => {
              setFilterDate(newValue);
              handleDateFilter(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} size="small" sx={{ width: 180 }} />
            )}
          />
        </LocalizationProvider>

        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem
            onClick={() => handleStatusFilter("all")}
            selected={currentFilter === "all"}
          >
            All Tasks
          </MenuItem>
          <MenuItem
            onClick={() => handleStatusFilter("Pending")}
            selected={currentFilter === "Pending"}
          >
            Pending
          </MenuItem>
          <MenuItem
            onClick={() => handleStatusFilter("In Progress")}
            selected={currentFilter === "In Progress"}
          >
            In Progress
          </MenuItem>
          <MenuItem
            onClick={() => handleStatusFilter("Done")}
            selected={currentFilter === "Done"}
          >
            Done
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default TaskFilters;
