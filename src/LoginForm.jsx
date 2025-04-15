import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.email && loginData.password) {
      toast.success("Login successful (mock)!");
    } else {
      toast.error("Please enter valid credentials.");
    }
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center">
      <div className="card w-100 mx-3" style={{ maxWidth: "450px", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", borderRadius: "15px", backgroundColor: "#f8f9fa" }}>
        <div className="card-body p-4">
          <h3 className="text-center mb-4">Login</h3>
          <form onSubmit={handleLogin}>
            <input type="email" name="email" value={loginData.email} onChange={handleChange} className="form-control mb-3" placeholder="Enter email" required />
            <input type="password" name="password" value={loginData.password} onChange={handleChange} className="form-control mb-4" placeholder="Enter password" required />
            <div className="d-grid">
              <button className="btn btn-sm mb-3" type="submit" style={{ backgroundColor: "#add8e6", color: "#000", border: "none", borderRadius: "15px" }}>Login</button>
            </div>
          </form>
          <p className="text-center">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
