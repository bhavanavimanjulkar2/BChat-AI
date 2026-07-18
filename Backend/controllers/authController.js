import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// =======================
// Signup Controller
// =======================

export const signup = async (req, res) => {

    try {

        const name = req.body.name.trim();
        const email = req.body.email.trim().toLowerCase();
        const password = req.body.password;

        console.log("Incoming Email:", email);

        const existingUser = await User.findOne({ email });

        console.log("Existing User:", existingUser);

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            success: true,
            message: "Account created successfully",
            user
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};


// export const signup = async (req, res) => {

//     try {

//         const { name, email, password } = req.body;

//         // Check if user already exists

//         const existingUser = await User.findOne({ email });

//         if (existingUser) {
//             return res.status(400).json({
//                 success: false,
//                 message: "User already exists"
//             });
//         }

//         // Hash Password

//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create User

//         const user = await User.create({
//             name,
//             email,
//             password: hashedPassword
//         });

//         res.status(201).json({
//             success: true,
//             message: "Account created successfully",
//             user
//         });

//     } catch (error) {

//         console.log(error);

//         res.status(500).json({
//             success: false,
//             message: "Server Error"
//         });

//     }

// };


// =======================
// Login Controller
// =======================

export const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {

            return res.status(400).json({
                success: false,
                message: "Invalid Password"
            });

        }

        const token = jwt.sign(

            { id: user._id },

            process.env.JWT_SECRET,

            { expiresIn: "7d" }

        );

        res.status(200).json({

            success: true,
            message: "Login Successful",

            token,

            user: {

                id: user._id,
                name: user.name,
                email: user.email

            }

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: "Server Error"

        });

    }

};

// =======================
// Forgot Password
// =======================

export const forgotPassword = async (req, res) => {

    try {

        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "Email not registered"
            });

        }

        res.status(200).json({
            success: true,
            message: "Email verified"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

// =======================
// Reset Password
// =======================

export const resetPassword = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update password
        user.password = hashedPassword;

        await user.save();

        res.status(200).json({

            success: true,
            message: "Password updated successfully"

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: "Server Error"

        });

    }

};