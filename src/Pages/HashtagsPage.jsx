import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import Post from "../Components/Post";
import useToken from "../Hooks/useToken.js";
import api from "../Services/api.js";
import MainTemplate from "../Components/Templates/MainTemplate.jsx";
import LoadingMessage from "../Components/Atoms/LoadingMessage.jsx";
import ErrorFetchMessage from "../Components/Atoms/ErrorFetchMessage.jsx";
import useTrending from "../Hooks/useTrending";


export default function HashtagsPage() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);
  const {setTrendingHashtags} = useTrending();
  const [loading, setLoading] = useState(true);
  const { hashtag } = useParams();
  const { token } = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return navigate("/");
    reload();
  }, [hashtag]);

 async function reload() {
    setLoading(true);
    if(!hashtag) return;
    api.getPostsByHashtag(hashtag, token)
      .then(({ data }) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
        try {
          const responseHashtags = (await api.getAllHashtags(token)).data;
          setTrendingHashtags(responseHashtags);
        } catch (err) {
          console.log(err);
        }

  }

  return (
    <MainTemplate textHeader={`#${hashtag}`}>
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
                  metadata_title={post.metadata?.title}
                  metadata_description={post.metadata?.description}
                  metadata_image={post.metadata?.image}
                  first_liker_name={post.first_liker_name}
                  second_liker_name={post.second_liker_name}
                />
              ))
            )}
    </MainTemplate >
  );
}