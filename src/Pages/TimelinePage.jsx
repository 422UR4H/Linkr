import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useToken from "../Hooks/useToken.js";
import MainTemplate from "../Components/Templates/MainTemplate.jsx";
import CreatePost from "../Components/CreatePost";
import Post from "../Components/Post";
import api, { getNewPosts, getPosts } from "../Services/api.js";
import useTrending from "../Hooks/useTrending.js";
import ErrorFetchMessage from "../Components/Atoms/ErrorFetchMessage.jsx";
import LoadingMessage from "../Components/Atoms/LoadingMessage.jsx";
import NoPostsYetMessage from "../Components/Atoms/NoPostsYetMessage.jsx";
import YouDontFollowAnyoneYetMessage from "../Components/Atoms/YouDontFollowAnyoneYet.jsx";
import InfiniteScroll from "react-infinite-scroller";
import UserContext from "../Contexts/UserContext.jsx";
import { sortPostsByDate } from "../Utils/utils.js";
import useInterval from "use-interval";
import Button from "../Styles/Button.js";
import { styled } from "styled-components";

export default function TimelinePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { setTrendingHashtags } = useTrending();
  const { token } = useToken();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [userIsFollowing, setUserIsFollowing] = useState(true);
  const [morePosts, setMorePosts] = useState(true);
  const { user } = useContext(UserContext);
  const [newPostsAvailable, setNewPostsAvailable] = useState(false);
  const [initialPosts, setInitialPosts] = useState([]);
  const [newPostsCount, setNewPostsCount] = useState(0);


  const loadMore = async () => {
    try {
      //console.log("Loading more posts from page:", page + 1);

      const nextPage = page + 1;
      //console.log("Loaded new page:", nextPage);
      const response = await api.getPosts(token, nextPage);

      if (response.status === 202 || response.status === 204) {
        setMorePosts(false);
      } else if (response.status === 200) {
        //console.log("Loaded new posts:", response.data);

        const newPosts = response.data;
        if (newPosts.length === 0) {
          setMorePosts(false);
        } else {
          const newPostsFiltered = filterDuplicateObjects([
            ...posts,
            ...newPosts,
          ]);
          setPosts(newPostsFiltered);
          setPage(nextPage);
          setMorePosts(true);
          //console.log("Posts loaded and added to the list.");
        }
      }
    } catch (err) {
      //console.log("Error loading more posts:", err);
    }
  };

  function areObjectsEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  function hasDuplicateObject(arr, obj) {
    for (let i = 0; i < arr.length; i++) {
      if (areObjectsEqual(arr[i], obj)) {
        return true;
      }
    }
    return false;
  }

  function filterDuplicateObjects(arr) {
    const uniqueObjects = [];

    for (let i = 0; i < arr.length; i++) {
      if (!hasDuplicateObject(uniqueObjects, arr[i])) {
        uniqueObjects.push(arr[i]);
      }
    }

    return uniqueObjects;
  }

  useEffect(() => {
    if (!token) return navigate("/");
    reload();
  }, []);

  async function reload() {
    setLoading(true);

    try {
      const response = await api.getPosts(token, 0);
      if (response.status === 202 || response.status === 204) {
        setPosts([]);
        setMorePosts(false);
      } else if (response.status === 200) {
        //console.log("Loaded new posts:", response.data);
        const posts = response.data;
        setPosts(posts);
        setInitialPosts(response.data);
      }
      setTrendingHashtags((await api.getAllHashtags(token)).data);
      setLoading(false);
      setNewPostsAvailable(false);
    } catch (err) {
      //console.log(err);
      alert(
        "An error occurred while trying to fetch the posts, please refresh the page"
      );
      setError(true);
    }
  }

  async function reloadPageInfoAfterRepostLike(postId) {
    let updatedReposts = [];
    let updatedCount = 0;
    //console.log(postId);

    try {
      const response = await api.getPosts(token, 0);
      if (response.status === 202 || response.status === 204) {
        setPosts([]);
        setMorePosts(false);
      } else if (response.status === 200) {
        let newPosts = response.data;
        for (let index = 0; index < newPosts.length; index++) {
          const post = newPosts[index];
          if (post.is_repost && post.id === postId) {
            updatedReposts.push(post);
            updatedCount += 1;
          }
        }
        newPosts = newPosts.slice().filter((p) => p.id !== postId);
        const finalPosts = sortPostsByDate([...updatedReposts, ...newPosts]);
        setPosts(finalPosts);
      }

      setLoading(false);
    } catch (err) {
      console.log(err);
      alert(
        "An error occurred while trying to fetch the posts, please refresh the page"
      );
      setError(true);
    }
  }

  async function checkIfUserIsFollowing() {
    try {
      const response = await api.checkIfUserIsFollowing(token);
      console.log(response);
      if (response.status === 202) return setUserIsFollowing(false);
    } catch (err) {
      console.log(err);
    }
  }

  useInterval(async () => {
    console.log("Checking for new posts...");
    try {
      const response = await getPosts(token);
      const newPosts = response.data;

      const diffPosts = newPosts.filter((newPost) => {
        return !initialPosts.some(
          (initialPost) => initialPost.id === newPost.id
        );
      });

      if (diffPosts.length > 0) {
        console.log(`${diffPosts.length} new posts available.`);

        setNewPostsCount(diffPosts.length);
        setNewPostsAvailable(true);

        setInitialPosts(newPosts);
      } else {
        console.log("No new posts available.");
        setNewPostsAvailable(false);
      }
    } catch (error) {
      console.error("Error checking for new posts:", error);
    }
  }, 5000);
  return (
    <MainTemplate textHeader="timeline">
      <CreatePost reload={reload} />
      {newPostsAvailable && (
        <ButtonNewPosts onClick={(reload)}>{newPostsCount} new posts, load more!</ButtonNewPosts>
      )}
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
        >
          {" "}
          {posts.length > 0 ? (
            posts.map((post) => (
              <Post
                reload={reload}
                key={
                  post.is_repost
                    ? post.repost_id + Date.now()
                    : post.id + Date.now()
                }
                avatar_photo_url={post.user_photo}
                name={post.user_name}
                description={post.description}
                like_count={post.likes_count}
                link={post.link}
                owner_id={post.owner_id}
                post_id={post.is_repost ? post.repost_id : post.id}
                default_liked={post.default_liked}
                first_liker_name={post.first_liker_name}
                second_liker_name={post.second_liker_name}
                repost_count={post?.repost_count}
                created_at={
                  post.is_repost ? post.repost_created_at : post.created_at
                }
                is_repost={post.is_repost}
                references_post_id={post.is_repost ? post.id : -69}
                reposted_by_name={
                  post.is_repost == false
                    ? post.user_name
                    : post.is_repost && post.reposted_by_id === user.id
                    ? "you"
                    : post.is_repost && post.owner_id !== user.id
                    ? post.user_name
                    : ""
                }
                reload_reposts={reloadPageInfoAfterRepostLike}
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


const ButtonNewPosts = styled(Button)`
  width: 100%;
  max-width: 611px;
box-shadow: 0px 4px 4px 0px #00000040;

`