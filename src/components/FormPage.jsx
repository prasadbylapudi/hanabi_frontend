import React, { useState, useEffect } from "react";
import { Button, Container, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
const FormPage = () => {
  const navigate = useNavigate();

  const [formFields, setFormFields] = useState({
    username: localStorage.getItem("username"),
    name: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
  });

  const initialUsername = localStorage.getItem("username");

  // Use useEffect to make the request when the component mounts
  useEffect(() => {
    if (initialUsername) {
      fetch(`http://localhost:3000/form/${initialUsername}`)
        .then((response) => {
          if (response.status === 404) {
            alert("User not found");
          } else if (response.status === 200) {
            return response.json();
          } else {
            alert("An error occurred while fetching user data");
          }
        })
        .then((data) => {
          console.log(">>data", data.data);
          if (data.data) {
            setFormFields(data.data);
          }
        })
        .catch((error) => {
          console.error("Error:", error.message);
          alert("An error occurred while fetching user data");
        });
    }
  }, [initialUsername]); // Run this effect when initialUsername changes

  const handleSubmit = () => {
    console.log("Form submitted");
    console.log(">>form fields", formFields);

    // Check if the user exists
    if (initialUsername) {
      // User exists, make a PUT request to update user details
      fetch(`http://localhost:3000/form/${initialUsername}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formFields),
      })
        .then((response) => {
          if (response.status === 200) {
            alert("User details updated successfully!");
            navigate("/results");
          } else {
            alert("An error occurred while updating user details");
          }
        })
        .catch((error) => {
          console.error("Error:", error.message);
          alert("An error occurred while updating user details");
        });
    } else {
      // User doesn't exist, make a POST request to submit user details
      fetch("http://localhost:3000/form/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formFields),
      })
        .then((response) => {
          if (response.status === 201) {
            navigate("/results");
          } else {
            alert("An error occurred while submitting the form data");
          }
        })
        .catch((error) => {
          console.error("Error:", error.message);
          alert("An error occurred while submitting the form data");
        });
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

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
      <Container>
        <Typography variant="h4" gutterBottom>
          Form Page
        </Typography>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          style={{ marginBottom: "16px" }}
          value={formFields.name || ""}
          onChange={(e) =>
            setFormFields({ ...formFields, name: e.target.value })
          }
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          style={{ marginBottom: "16px" }}
          value={formFields.email || ""}
          onChange={(e) =>
            setFormFields({ ...formFields, email: e.target.value })
          }
        />
        <TextField
          label="Phone Number"
          variant="outlined"
          fullWidth
          style={{ marginBottom: "16px" }}
          value={formFields.phoneNumber || ""}
          onChange={(e) =>
            setFormFields({ ...formFields, phoneNumber: e.target.value })
          }
        />
        <Typography color="#000000" variant="h6">
          Date of Birth:
        </Typography>
        <TextField
          type="date"
          variant="outlined"
          fullWidth
          style={{ marginBottom: "16px" }}
          InputLabelProps={{ shrink: false }}
          placeholder="Date of Birth"
          value={formFields.dateOfBirth || ""}
          onChange={(e) =>
            setFormFields({ ...formFields, dateOfBirth: e.target.value })
          }
        />

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            color="secondary" // Use a different color for the Cancel button
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default FormPage;
