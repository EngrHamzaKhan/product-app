import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setTokens } from "../store/authSlice";
import { login } from "../services/authService";
import '../assets/styles/Login.css'
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  // You can remove the `onLogin` prop, as you're using Redux now
}

const Login: React.FC<LoginProps> = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { accessToken, refreshToken } = await login(username, password);

      // Store tokens in Redux
      dispatch(setTokens({ accessToken, refreshToken }));

      // Optionally, store tokens in localStorage for persistence across reloads
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      navigate('/product');
      console.log("Login successful!");
    } catch (error) {
      setError("Invalid username or password");
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <div className="forgot-password">
          <a href="#">Forgot Password?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;