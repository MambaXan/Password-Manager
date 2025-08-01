import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const users = JSON.parse(localStorage.getItem("users")) || {};
    const { email, password, name } = formData;

    if (isLogin) {
      if (users[email] && users[email].password === password) {
        localStorage.setItem("currentUser", email);
        navigate("/");
      } else {
        alert("Invalid email or password");
      }
    } else {
      if (users[email]) {
        alert("User already exists");
      } else {
        users[email] = { password, name, savedPasswords: [] };
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUser", email);
        navigate("/");
      }
    }

    setIsSubmitting(false);
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: "",
      password: "",
      name: "",
    });
  };

  return (
    <div className="auth-container">
      <div className={`auth-card ${isLogin ? "login-mode" : "register-mode"}`}>
        <div className="auth-header">
          <h1 className="auth-title">
            {isLogin ? "Welcome back" : "Create account"}
          </h1>
          <p className="auth-subtitle">
            {isLogin
              ? "Log in to your account"
              : "Get started with password manager"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
                className="input-field"
              />
              <button
                type="button"
                className="show-password-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {isLogin && (
            <div className="form-options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                Remember me
              </label>
              <a href="#forgot" className="forgot-password">
                Forgot password?
              </a>
            </div>
          )}

          <button type="submit" className="auth-button" disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="spinner"></span>
            ) : isLogin ? (
              "Log in"
            ) : (
              "Sign up"
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              className="toggle-auth-mode"
              onClick={toggleAuthMode}
            >
              {isLogin ? " Sign up" : " Log in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
