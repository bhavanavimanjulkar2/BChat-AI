import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {

    if (localStorage.getItem("token")) {
      navigate("/chat");
    }

  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

        const response = await API.post("/auth/login", {

            email: formData.email,
            password: formData.password

        });

        // Save JWT token
        localStorage.setItem("token", response.data.token);

        // Save logged in user
        localStorage.setItem("user", JSON.stringify(response.data.user));

        alert(response.data.message);

        navigate("/chat");

    } catch (error) {

        alert(
            error.response?.data?.message || "Login Failed"
        );

    }

  };

  return (
    <div className="login-container">

      <div className="login-card">

        <h2>Welcome Back</h2>

        <div className="logo">
            B
        </div>

        <p className="subtitle">
            Sign in to continue to BChat AI
        </p>

        <form onSubmit={handleLogin}>

            <label>Email</label>

            <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
            />

            <label>Password</label>

            <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
            />

            <div className="options">

                <label className="remember">
                    <input type="checkbox" />
                    Remember me
                </label>

                <Link to="/forgot-password">
                  Forgot Password?
                </Link>

            </div>

            <button className="login-btn" type="submit">
                Login
            </button>

        </form>

        <p className="bottom-text">
            Don't have an account?
            <Link to="/signup"> Sign Up</Link>
        </p>

      </div>

    </div>
  );
}

export default Login;