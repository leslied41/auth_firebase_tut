import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./Signup.scss";
import { useAuth } from "../components/contexts/AuthProvider";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Signin({ setLoginStatus, loginStatus }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, currentUser } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return setError("no email and password");
    try {
      setError("");
      await logIn(email, password);
      localStorage.setItem("logged", true);
      setLoginStatus(!loginStatus);
      navigate("/");
      //this is gold
    } catch (err) {
      console.log(err);
      setError("fail to log in");
    }
  };
  return (
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
        <h2>Sign In</h2>
        <TextField
          id="standard-basic"
          label="email"
          variant="standard"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <TextField
          id="standard-basic"
          label="password"
          type="password"
          variant="standard"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button onClick={handleSubmit}>Sign In</button>
        <p>
          no account? <Link to="/signup">Resiter here!</Link>{" "}
        </p>
        <p>
          <Link to="/forgetpassword">forget password? </Link>
        </p>
      </Box>
    </div>
  );
}
