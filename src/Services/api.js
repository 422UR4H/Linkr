import axios from "axios";
import config from "./config.js";

function signin(body) {
  return axios.post(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/sign-in`, body);
}

function signup(body) {
  return axios.post(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/sign-up`, body);
}


const api = {
  signin,
  signup
};

export default api;
