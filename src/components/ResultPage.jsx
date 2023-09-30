import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const ResultPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "white",
      }}
    >
      <p>Congratulations! Your form has been submitted successfully.</p>
      <Link to="/">
        <Button variant="contained" color="secondary">
          Return to Homepage
        </Button>
      </Link>
    </div>
  );
};

export default ResultPage;
