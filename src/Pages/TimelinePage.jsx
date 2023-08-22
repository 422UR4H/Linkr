import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useToken from "../Hooks/useToken.js";
import MainTemplate from "../Components/Templates/MainTemplate.jsx";
import CreatePost from "../Components/CreatePost";
import Post from "../Components/Post";
import api from "../Services/api.js";
import useTrending from "../Hooks/useTrending.js";
import ErrorFetchMessage from "../Components/Atoms/ErrorFetchMessage.jsx";
import LoadingMessage from "../Components/Atoms/LoadingMessage.jsx";
import NoPostsYetMessage from "../Components/Atoms/NoPostsYetMessage.jsx";
import YouDontFollowAnyoneYetMessage from "../Components/Atoms/YouDontFollowAnyoneYet.jsx";

export default function TimelinePage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { setTrendingHashtags } = useTrending();
    const { token } = useToken();
    const navigate = useNavigate();
    const [userIsFollowing, setUserIsFollowing] = useState(true); 

    useEffect(() => {
        if (!token) return navigate("/");
        reload();
        checkIfUserIsFollowing();
    }, []);

    async function reload() {
        setLoading(true);

        try {
            const posts = (await api.getPosts(token)).data;
            //console.log(posts);
            setPosts(posts);
            setTrendingHashtags((await api.getAllHashtags(token)).data);
            setLoading(false);
        } catch (err) {
            console.log(err);
            alert("An error occured while trying to fetch the posts, please refresh the page");
            setError(true);
        }
    }

    async function checkIfUserIsFollowing() { 
        try {
            const response = await api.checkIfUserIsFollowing(token);
            if(response.status ===404) return setUserIsFollowing(false)
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <MainTemplate textHeader="timeline">
          <CreatePost reload={reload} />
          {loading ? (
            <LoadingMessage />
          ) : error ? (
            <ErrorFetchMessage />
          ) : !userIsFollowing ? ( 
            <YouDontFollowAnyoneYetMessage />
          ) : posts.length === 0 && userIsFollowing ? ( 
            <NoPostsYetMessage />
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
                first_liker_name={post.first_liker_name}
                second_liker_name={post.second_liker_name}
              />
            ))
          )}
        </MainTemplate>
      );
      
}