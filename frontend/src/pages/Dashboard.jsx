import React, { useState } from "react";
import { Container, Box, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TaskFilters from "../components/tasks/TaskFilters";
import TaskList from "../components/tasks/TaskList";
import TaskForm from "../components/tasks/TaskForm";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [openForm, setOpenForm] = useState(false);
  const { user } = useSelector((state) => state.auth);

  return (
    <Container maxWidth="lg">
      <TaskFilters />
      <TaskList />

      <Box sx={{ position: "fixed", bottom: 32, right: 32 }}>
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => setOpenForm(true)}
          disabled={!user}
        >
          <AddIcon />
        </Fab>
      </Box>

      <TaskForm open={openForm} handleClose={() => setOpenForm(false)} />
    </Container>
  );
};

export default Dashboard;
