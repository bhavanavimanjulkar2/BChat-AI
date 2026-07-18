import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import API from "../api/axios";

function Signup() {

    const navigate = useNavigate();

    const [formData,setFormData]=useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:""
    });

    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    }

    const handleSignup = async (e) => {

        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {

            const response = await API.post("/auth/signup", {

                name: formData.name,
                email: formData.email,
                password: formData.password

            });

            alert(response.data.message);

            navigate("/");

        } catch (error) {

            alert(
                error.response?.data?.message || "Signup Failed"
            );

        }

    };

    return(

        <div className="signup-container">

            <div className="signup-card">

                <h2>Create Account</h2>

                <div className="logo">
                    B
                </div>

                <p className="subtitle">
                    Join BChat AI today
                </p>

                <form onSubmit={handleSignup}>

                    <label>Full Name</label>

                    <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    />

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
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    />

                    <label>Confirm Password</label>

                    <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    />

                    <button className="signup-btn" type="submit">
                        Create Account
                    </button>

                </form>

                <p className="bottom-text">

                    Already have an account?

                    <Link to="/"> Login</Link>

                </p>

            </div>

        </div>

    )

}

export default Signup;