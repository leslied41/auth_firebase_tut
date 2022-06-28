import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./Signup.scss";
import { useAuth } from "../components/contexts/AuthProvider";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const { signUp, currentUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || !rePassword || !email) return;
    if (password !== rePassword) return setError("passwords do not match");
    try {
      setLoading(true);
      setError("");
      await signUp(email, password);
      navigate("/signin");
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
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
        {error && <p>{error}</p>}
        <h2>Sign Up</h2>
        <TextField
          id="standard-basic"
          label="email"
          variant="standard"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          id="standard-basic"
          label="password"
          type="password"
          variant="standard"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <TextField
          id="standard-basic"
          label="password"
          type="password"
          variant="standard"
          onChange={(e) => setRePassword(e.target.value)}
          required
        />

        <button onClick={handleSubmit} disabled={loading}>
          Sign Up
        </button>
        <p>
          Alread have an account? <Link to="/signin">Log In</Link>{" "}
        </p>
      </Box>
    </div>
  );
}
