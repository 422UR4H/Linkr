import { styled } from "styled-components";
import CreatePost from "../Components/CreatePost";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useEffect, useState } from "react";
import axios from "axios";
import Post from "../Components/Post";
export default function Timeline() {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(1);
  const [posts, setPosts] = useState([]);

  /* useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/timeline`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []); */

  const handleLikeClick = () => {
    if (!liked) {
      setLiked(true);
      setLikesCount(likesCount + 1);
    } else {
      setLiked(false);
      setLikesCount(likesCount - 1);
    }
  };

  return (
    <>
      <CreatePost />
      {posts.map((post) => (
        <Post
          key={post.id}
          avatar_photo_url={post.avatar_photo_url}
          name={post.name}
          description={post.description}
          like_count={post.like_count}
          link={post.link}
          owner_id={post.owner_id}
          post_id={post.post_id}
          default_liked={post.default_liked}
          metadata_title={post.metadata_title}
          metadata_description={post.metadata_description}
          metadata_image={post.metadata_image}
        />
      ))}
    </>
  );
}
