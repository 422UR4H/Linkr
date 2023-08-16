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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/timeline`)
      .then((response) => {
        console.log(response.data);
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(true);
      });
  }, []);

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
      <ContainerTimeline>
        <CreatePost />
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>
            An error occured while trying to fetch the posts, please refresh the
            page.
          </p>
        ) : posts.length === 0 ? (
          <p>There are no posts yet.</p>
        ) : (
          posts.map((post) => (
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
              metadata_title={post.metadata.title}
              metadata_description={post.metadata.description}
              metadata_image={post.metadata.image}
            />
          ))
        )}
      </ContainerTimeline>
    </>
  );
}

const ContainerTimeline = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    color: #707070;
    font-size: 40px;
  }
`;
