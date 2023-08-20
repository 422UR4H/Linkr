import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import Post from "../Components/Post";
import useToken from "../Hooks/useToken.js";
import api from "../Services/api.js";
import MainTemplate from "../Components/Templates/MainTemplate.jsx";
import LoadingMessage from "../Components/Atoms/LoadingMessage.jsx";
import ErrorFetchMessage from "../Components/Atoms/ErrorFetchMessage.jsx";


export default function Hashtags() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const { hashtag } = useParams();
  const { token } = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return navigate("/");
    reload();
  }, [hashtag]);

  function reload() {
    setLoading(true);
    api.getPostsByHashtag(hashtag, token)
      .then(({ data }) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  }

  return (
    <MainTemplate textHeader={`#${hashtag}`}>
      <StyledHashtags>
        {loading ?
          <LoadingMessage /> : error ?
            <ErrorFetchMessage /> : posts.length === 0 ? (
              <p>There are no posts yet</p>
            ) : (
              posts.map((post) => (
                <Post
                  reload={reload}
                  key={post.id}
                  avatar_photo_url={post.user_photo}
                  name={post.user_name}
                  description={post.description}
                  like_count={post.likes_count}
                  link={post.link}
                  owner_id={post.owner_id}
                  post_id={post.id}
                  default_liked={post.default_liked}
                  metadata_title={post.metadata.title}
                  metadata_description={post.metadata.description}
                  metadata_image={post.metadata.image}
                  first_liker_name={post.first_liker_name}
                  second_liker_name={post.second_liker_name}
                />
              ))
            )}
      </StyledHashtags>
    </MainTemplate >
  );
}

const StyledHashtags = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 611px;

  .loading{
    font-size: 40px;
    color: white;
    font-family: Oswald;
    margin-top: 20px;
  }
  @media (max-width: 720px) {
    width: 100%;
  }
`;