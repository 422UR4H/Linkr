import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Post from "../Components/Post";
import useToken from "../Hooks/useToken.js";
import api from "../Services/api.js";
import MainTemplate from "../Components/Templates/MainTemplate.jsx";
import LoadingMessage from "../Components/Atoms/LoadingMessage.jsx";
import ErrorFetchMessage from "../Components/Atoms/ErrorFetchMessage.jsx";
import useTrending from "../Hooks/useTrending";
import UserContext from "../Contexts/UserContext";
import { sortPostsByDate } from "../Utils/utils";

export default function HashtagsPage() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);
  const { setTrendingHashtags } = useTrending();
  const [loading, setLoading] = useState(true);
  const { hashtag } = useParams();
  const { token } = useToken();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return navigate("/");
    reload();
  }, [hashtag]);

  async function reload() {
    setLoading(true);
    if (!hashtag) return;
    api.getPostsByHashtag(hashtag, token)
      .then(({ data }) => {
        setPosts(sortPostsByDate(data));
        //console.log(data);
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

  async function reloadPageInfoAfterRepostLike(postId) {
    let updatedReposts = [];
    let updatedCount = 0;
    //console.log(postId);

    try {
      const response = await api.getPosts(token, 0);

      let newPosts = response.data;
      for (let index = 0; index < newPosts.length; index++) {
        const post = newPosts[index];
        if (post.is_repost && post.id === postId) {
          updatedReposts.push(post);
          updatedCount += 1;
        }
      }
      newPosts = newPosts.slice().filter(p => p.id !== postId);
      const finalPosts = sortPostsByDate([...updatedReposts, ...newPosts]);
      setPosts(finalPosts);
      setLoading(false);
    } catch (err) {
      console.log(err);
      alert("An error occurred while trying to fetch the posts, please refresh the page");
      setError(true);
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
                key={post.is_repost ? post.repost_id + Date.now() : post.id + Date.now()}
                avatar_photo_url={post.user_photo}
                name={post.user_name}
                description={post.description}
                like_count={post.likes_count}
                link={post.link}
                owner_id={post.is_repost ? post.reposted_by_id : post.owner_id}
                post_id={post.is_repost ? post.repost_id : post.id}
                default_liked={post.default_liked}
                first_liker_name={post.first_liker_name}
                second_liker_name={post.second_liker_name}
                repost_count={post?.repost_count}
                created_at={post.created_at}
                is_repost={post.is_repost}
                references_post_id={post.is_repost ? post.id : -69}
                reposted_by_name={post.is_repost == false ? post.user_name : post.is_repost && post.reposted_by_id === user.id ? "you" : post.is_repost && post.owner_id !== user.id ? post.user_name : ""}
                reload_reposts={reloadPageInfoAfterRepostLike}
              />
            ))
          )}
    </MainTemplate >
  );
}