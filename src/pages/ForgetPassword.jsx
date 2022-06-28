import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useAuth } from "../components/contexts/AuthProvider";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./ForgetPassword.scss";

const ForgetPassword = () => {
  const { reset } = useAuth();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return setError("no email");
    try {
      setMessage("");
      setError("");
      await reset(email);
      setMessage("please check your email box");
    } catch (err) {
      setError("failed to reset");
      console.log(err);
    }
  };
  return (
    <div>
      <div className="signup-container">
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "100%" },
          }}
          noValidate
          autoComplete="off"
          className="signup"
        >
          {message && (
            <p
              style={{
                width: "100%",
                backgroundColor: "gray",
                padding: "10px 5px",
              }}
            >
              {message}
            </p>
          )}
          {error && (
            <p
              style={{
                width: "100%",
                backgroundColor: "gray",
                padding: "10px 5px",
              }}
            >
              {error}
            </p>
          )}
          <h2>Reset Password</h2>
          <TextField
            id="standard-basic"
            label="email"
            variant="standard"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <button onClick={handleSubmit}>Reset</button>
        </Box>
      </div>
    </div>
  );
};
export default ForgetPassword;
