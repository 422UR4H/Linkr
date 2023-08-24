import axios from "axios";
import config from "./config.js";

function signin(body) {
  return axios.post(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/sign-in`, body);
}

function signup(body) {
  return axios.post(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/sign-up`, body);
}

function createPost(body, token) {
  return axios.post(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/posts`, body, config(token));
}

export function getPosts(token, page) {
  return axios.get(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/timeline?page=${page}`, config(token));
}

function editPost(body, token, id) {
  return axios.put(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/posts/${id}`, body, config(token));
}

function deletePost(token, id) {
  return axios.delete(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/posts/${id}`, config(token));
}

function deleteRepost(token, id) {
  return axios.delete(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/reposts/${id}`, config(token));
}

function getAllHashtags(token) {
  return axios.get(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/hashtags`, config(token));
}

function getPostsByHashtag(hashtag, token) {
  return axios.get(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/posts/${hashtag}`, config(token));
}

function setLike(id, body, token) {
  return axios.post(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/like/${id}`, body, config(token));
}

function setUnlike(id, token) {
  return axios.delete(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/dislike/${id}`, config(token));
}

function getUsersByName(name, token) {
  return axios.get(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/users/name/${name}`, config(token));
}

function getUserById(id, token) {
  return axios.get(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/users/id/${id}`, config(token));
}
function repost(postId, token) {
  return axios.post(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/repost`, { postId }, config(token));
}
function urlMetadata(link) {
  return axios.get(`https://jsonlink.io/api/extract?url=${link}`);
}

function checkIfUserIsFollowing(token) {
  return axios.get(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/timeline`, config(token));
}

function setFollow(id, body, token) {
  return axios.post(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/users/follow/${id}`, body, config(token));
}

function setUnfollow(id, token) {
  return axios.delete(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/users/follow/${id}`, config(token));
}

function checkFollower(id, token) {
  return axios.get(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/users/follow/${id}`, config(token));
}

const api = {
  signin, signup,
  getUsersByName, getUserById,
  createPost, getPosts, editPost, deletePost,
  getAllHashtags, getPostsByHashtag,
  setLike, setUnlike, urlMetadata, checkIfUserIsFollowing, repost, deleteRepost,
  setFollow, setUnfollow, checkFollower
};
export default api;

