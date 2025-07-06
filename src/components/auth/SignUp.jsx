import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../authContext";
import { Link } from "react-router-dom";
import logo from "../../assets/github-mark-white.png";
import "./auth.css";

function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setCurrentUser } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3000/signup/", {
        email: email,
        password: password,
        username: username
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      setCurrentUser(res.data.userId);
      setLoading(false);
      window.location.href ="/";
    } catch (error) {
      console.error(error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-logo-container">
        <img className="auth-logo" src={logo} alt="GitHub Logo" />
      </div>

      <div className="auth-container">
        <div className="auth-header">
          <h1 className="auth-title">Create your account</h1>
        </div>
        
        <div className="auth-box">
          <form onSubmit={handleSignup}>
            <div className="form-group">
              <label className="form-label" htmlFor="username">
                Username
              </label>
              <input
                autoComplete="off"
                name="username"
                id="username"
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            
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
              <p className="password-hint">
                Make sure it's at least 15 characters OR at least 8 characters including a number and a lowercase letter.
              </p>
            </div>
            
            <button
              type="submit"
              className="auth-button"
              disabled={loading}
            >
              {loading ? (
                <span className="spinner"></span>
              ) : (
                "Create account"
              )}
            </button>
          </form>
          
          <div className="divider-container">
            <div className="divider"></div>
            <span className="divider-text">Already have an account?</span>
            <div className="divider"></div>
          </div>
          
          <Link to="/auth" className="create-account-button">
            Sign in
          </Link>
        </div>
        
        <div className="auth-footer">
          <ul className="footer-links">
            <li><a href="#">Terms</a></li>
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Security</a></li>
            <li><a href="#">Contact GitHub</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SignUp;