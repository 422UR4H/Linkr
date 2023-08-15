import axios from "axios";
import config from "./config.js";


function signin(body) {
    return axios.post(`${import.meta.env.VITE_API_URL}/sign-in`, body);
}
function signup(body) {
    return axios.post(`${import.meta.env.VITE_API_URL}/sign-up`, body);
}

const api = {
    signin, signup
};
export default api;