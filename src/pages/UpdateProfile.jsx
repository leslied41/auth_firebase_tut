import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./Signup.scss";
import { useAuth } from "../components/contexts/AuthProvider";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function UpdateProfile() {
  const { currentUser, updateUserEmail, updateUerPassword } = useAuth();
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || !rePassword || !email) return;
    if (password !== rePassword) return setError("passwords do not match");
    const promises = [];
    setLoading(true);
    setError("");
    if (email !== currentUser.email) promises.push(updateUserEmail(email));
    if (password) promises.push(updateUerPassword(password));
    Promise.all(promises)
      .then(() => {
        navigate("/");
      })
      .catch(() => setError("failed to uodate"))
      .finally(() => setLoading(false));
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
        <h2>Update Profile</h2>
        <TextField
          label="email"
          variant="standard"
          onChange={(e) => setEmail(e.target.value)}
          defaultValue={currentUser.email}
          required
        />
        <TextField
          label="password"
          type="password"
          variant="standard"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Leave blank to keep the same"
        />
        <TextField
          label="password"
          type="password"
          variant="standard"
          onChange={(e) => setRePassword(e.target.value)}
          placeholder="Leave blank to keep the same"
        />

        <button onClick={handleSubmit} disabled={loading}>
          Update
        </button>
        <p>
          <Link to="/">Cancel</Link>
        </p>
      </Box>
    </div>
  );
}
