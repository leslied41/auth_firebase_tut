import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../components/contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { currentUser, logOut } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleClick = async () => {
    setError("");
    try {
      await logOut();
      navigate("/signin");
      localStorage.removeItem("logged");
    } catch (error) {
      console.log(error);
      setError("failed to log out");
    }
  };
  return (
    <div>
      <h2>Profile</h2>
      <p>Email:{currentUser.email}</p>
      {/* <Link>to update profile page</Link> */}
      <Link to="updateprofile">Update Profile</Link>
      <button onClick={handleClick}>Log out</button>
    </div>
  );
};
export default Dashboard;
