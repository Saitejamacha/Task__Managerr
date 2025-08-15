import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", mt: 8 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to Task Manager
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 4 }}>
        Organize your tasks efficiently
      </Typography>
      <Box sx={{ "& > *": { m: 1 } }}>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
        <Button
          variant="outlined"
          size="large"
          onClick={() => navigate("/register")}
        >
          Register
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
