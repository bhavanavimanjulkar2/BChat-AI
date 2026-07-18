import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import "./ForgotPassword.css";

function ForgotPassword() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await API.post("/auth/forgot-password", {
                email
            });

            alert(response.data.message);

            navigate("/reset-password", {
                state: {
                    email
                }
            });

        } catch (err) {

            console.log(err);
            alert(err.response?.data?.message || "Something went wrong");

        }

    };

    return (

        <div className="forgot-container">

            <div className="forgot-card">

                <div className="logo">
                    B
                </div>

                <h2>Forgot Password?</h2>

                <p className="subtitle">
                    Enter your email to receive a password reset link.
                </p>

                <form onSubmit={handleSubmit}>

                    <label>Email</label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        required
                    />

                    <button
                        className="forgot-btn"
                        type="submit"
                    >
                        Verify Email
                    </button>

                </form>

                <p className="bottom-text">
                    Remember your password?
                    <Link to="/"> Login</Link>
                </p>

            </div>

        </div>

    );

}

export default ForgotPassword;