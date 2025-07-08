import React, { useEffect, useState } from "react";
import { useAuth } from "../../authContext";
import logo from "../../assets/github-mark-white.png";
import { Link } from "react-router-dom";
import axios from "axios";
import "./auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser, setCurrentUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("https://perso-git-backend.onrender.com/login/", {
        email: email,
        password: password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      setCurrentUser();
      setLoading(false);
      window.location.href = "/";
    } catch (error) {
      console.error(error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-logo-container">
        <img className="auth-logo" src={logo} alt="GitHub Logo" />
      </div>

      <div className="auth-container">
        <div className="auth-header">
          <h1 className="auth-title">Sign in to perso GitHub</h1>
        </div>
        
        <div className="auth-box">
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email address
              </label>
              <input
                autoComplete="off"
                name="email"
                id="email"
                className="form-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <div className="label-container">
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                <a href="#" className="forgot-password">
                  Forgot password?
                </a>
              </div>
              <input
                autoComplete="off"
                name="password"
                id="password"
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button
              type="submit"
              className="auth-button"
              disabled={loading}
            >
              {loading ? (
                <span className="spinner"></span>
              ) : (
                "Sign in"
              )}
            </button>
          </form>
          
          <div className="divider-container">
            <div className="divider"></div>
            <span className="divider-text">New to perso GitHub?</span>
            <div className="divider"></div>
          </div>
          
          <Link to="/signup" className="create-account-button">
            Create an account
          </Link>
        </div>
        
        <div className="auth-footer">
          <ul className="footer-links">
            <li><a href="#">Terms</a></li>
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Security</a></li>
            <li><a href="#">Contact perso GitHub</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Login;