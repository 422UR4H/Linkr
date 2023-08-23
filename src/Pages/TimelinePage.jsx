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
import InfiniteScroll from "react-infinite-scroller";

export default function TimelinePage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { setTrendingHashtags } = useTrending();
    const { token } = useToken();
    const navigate = useNavigate();
    const [page, setPage] = useState(0);=======
    const [userIsFollowing, setUserIsFollowing] = useState(true);
    const [morePosts, setMorePosts] = useState(true);
    const [hasNewPosts, setHasNewPosts] = useState(false);


const loadMore = async () => {
        try {
            console.log("Loading more posts from page:", page + 1);
            
            const nextPage = page + 1;
            const response = await api.getPosts(token, nextPage); 
    
            if (response.status === 202 || response.status === 204) {
                console.log("No more posts to load.");
                setMorePosts(false);
            } else if (response.status === 200) {
                console.log("Loaded new posts:", response.data);
                
                const newPosts = response.data;
                if (newPosts.length === 0) {
                    console.log("No more posts returned.");
                    setMorePosts(false);
                } else {
                    const uniqueNewPosts = newPosts.filter(newPost => 
                        !posts.some(existingPost => existingPost.id === newPost.id)
                    );                    
                    setPosts([...posts, ...uniqueNewPosts]);
                    setPage(nextPage); 
                    setMorePosts(true); 
                    console.log("Posts loaded and added to the list.");
                }
            }
        } catch (err) {
            console.log("Error loading more posts:", err);
        }
    };
    };

    useEffect(() => {
        if (!token) return navigate("/");
        reload();
    }, []);

    async function reload() {
        setLoading(true);

        try {
            const response = await api.getPosts(token, 0);
            console.log(response);
            if (response.status === 202 || response.status === 204) {
                setPosts([]);
                setMorePosts(false)
            }
            else if (response.status === 200) {
                const posts = response.data;
                setPosts(posts);
            }
            setTrendingHashtags((await api.getAllHashtags(token)).data);
            setLoading(false);
        } catch (err) {
            console.log(err);
            alert("An error occurred while trying to fetch the posts, please refresh the page");
            setError(true);
        }
    }

    async function checkIfUserIsFollowing() {
        try {
            const response = await api.checkIfUserIsFollowing(token);
            console.log(response);
            if (response.status === 202) return setUserIsFollowing(false)
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
              ) : (                 
            <InfiniteScroll
              pageStart={0}
              loadMore={loadMore}
              hasMore={morePosts}
              className="infinite-scroll-container"
              loader={loading ? <LoadingMessage /> : null}
            >  {posts.length > 0 ? (
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
                            repost_count={post.repost_count}
                          />
                          
                          ))
                          
                      ) : !userIsFollowing ? (
                          <YouDontFollowAnyoneYetMessage />
                      ) : (
                          <NoPostsYetMessage />
                      )}
                       </InfiniteScroll>
              )}
      </MainTemplate>
  );  
}


