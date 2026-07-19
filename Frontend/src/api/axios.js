import axios from "axios";

const API = axios.create({
    baseURL: "https://bchat-ai.onrender.com/api",
});

export default API;