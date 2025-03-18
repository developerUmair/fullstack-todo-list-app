import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { signOut } from "../api/authService";
import "../styles/Navbar.css";

const Navbar = () => {

   const isLogin = localStorage.getItem('accessToken');
  const { user } = useAuth();

  console.log(user)
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="logo">todoist</h1>
        <div className="nav-links">
            {}
          {isLogin ? (
            <>
              <span className="user-info">Welcome, {user?.data?.user.name}!</span>
              <button className="logout-btn" onClick={signOut}>
                Logout
              </button>
            </>
          ) : (
            <button className="login-btn" onClick={() => navigate("/sign-in")}>
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
