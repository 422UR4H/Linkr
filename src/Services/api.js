import axios from "axios";
import config from "./config.js";

function signin(body) {
  return axios.post(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/sign-in`, body);
}

function signup(body) {
  return axios.post(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/sign-up`, body);
}

function createPost(body, token) {
  return axios.post(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/post`, body, config(token));
}

function getPosts(token) {
  return axios.get(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/timeline`, config(token));
}

function editPost(body, token, id) {
  return axios.put(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/post/${id}`, body, config(token));
}

function getAllHashtags(token) {
  return axios.get(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/hashtags`, config(token));
}

function getPostsByHashtag(hashtag, token) {
  return axios.get(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/hashtags/${hashtag}`, config(token));
}

function setLike(id, body, token) {
  return axios.post(`${process.env.REACT_APP_API_URL}/like/${id}`, body, config(token));
}

function setUnlike(id, token) {
  return axios.delete(`${process.env.REACT_APP_API_URL}/dislike/${id}`, config(token));
}

function getUsersByName(name, token) {
  return axios.get(`${process.env.REACT_APP_API_URL}/users/${name}`, config(token));
}

const api = {
  signin, signup,
  getUsersByName,
  createPost, getPosts, editPost,
  getAllHashtags, getPostsByHashtag,
  setLike, setUnlike
};

export default api;
