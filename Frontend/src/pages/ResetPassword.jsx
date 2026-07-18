import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import API from "../api/axios";
import "./ResetPassword.css";

function ResetPassword() {

    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email;

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async(e) => {

        e.preventDefault();

        if(formData.password !== formData.confirmPassword){
            return alert("Passwords do not match");
        }

        try{

            const response = await API.post("/auth/reset-password",{

                email,
                password:formData.password

            });

            alert(response.data.message);

            navigate("/");

        }
        catch(err){

            alert(err.response?.data?.message || "Something went wrong");

        }

    };

    return(

        <div className="reset-container">

            <div className="reset-card">

                <div className="logo">B</div>

                <h2>Reset Password</h2>

                <p className="subtitle">
                    Enter your new password
                </p>

                <form onSubmit={handleSubmit}>

                    <label>New Password</label>

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter new password"
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

                    <button className="reset-btn" type="submit">
                        Update Password
                    </button>

                </form>

                <p className="bottom-text">
                    <Link to="/">Back to Login</Link>
                </p>

            </div>

        </div>

    );

}

export default ResetPassword;