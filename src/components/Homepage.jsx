import React, { useState, useEffect } from "react";
import { Button, Container, TextField, Typography, Box } from "@mui/material";

import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  useEffect(() => {
    localStorage.setItem("username", username);
  }, [username]);

  const handleSubmit = () => {
    console.log("clicked submit");
    if (username == "") {
      alert("Enter user name");
      navigate("/");
    } else {
      navigate("/form");
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        backgroundColor="white"
      >
        <TextField
          label="Username"
          variant="outlined"
          style={{ width: 400 }}
          value={username}
          onChange={handleUsernameChange}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          style={{ marginTop: "16px" }}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default Homepage;
