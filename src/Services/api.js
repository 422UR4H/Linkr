import axios from "axios";
import config from "./config.js";

function signin(body) {
  console.log(`${process.env.REACT_APP_API_URL}/sign-in`);
  return axios.post(`${process.env.REACT_APP_API_URL}/sign-in`, body);
}
function signup(body) {
  return axios.post(`${process.env.REACT_APP_API_URL}/sign-up`, body);
}

const api = {
  signin,
  signup,
};
export default api;
