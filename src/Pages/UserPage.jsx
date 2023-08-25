import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import useToken from '../Hooks/useToken';
import useTrending from '../Hooks/useTrending.js';
import Post from '../Components/Post';
import api from '../Services/api';
import MainTemplate from '../Components/Templates/MainTemplate.jsx';
import Button from '../Styles/Button.js';
import UserContext from '../Contexts/UserContext';
import { sortPostsByDate } from '../Utils/utils';
import { useLocation } from 'react-router';
import PostHolder from '../Components/PostHolder';

export default function UserPage() {
  const [thisUser, setThisUser] = useState(null); // thisUser.user_id O CARA QUE VAI SEGUIR OU DESEGUIR
  const [userNotFound, setUserNotFound] = useState(false);
  const { setTrendingHashtags } = useTrending();
  const { id } = useParams(); // O CARA QUE VAI SER SEGUIDO OU DESEGUIDO
  const { token } = useToken();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const location = useLocation();
  const [followingThisUser, setFollowingThisUser] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) return navigate('/');
    reload();
  }, []);

  async function reload() {
    //checkIfThisUserIsFollowing();
    api.getUserById(id, token)
      .then(res => {
        const userData = res.data;
        //console.log(userData);
        userData.user_posts = sortPostsByDate(userData.user_posts);
        setFollowingThisUser(res.data.following);
        setThisUser(userData);
        setLoading(false);
      }).catch((error) => {
        console.log(error);
        setUserNotFound(true);
        setLoading(false);
      });

    try {
      const responseHashtags = (await api.getAllHashtags(token)).data;
      setTrendingHashtags(responseHashtags);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  function checkIfThisUserIsFollowing() {
    if(id == user.id) return;
    api.checkFollower(id,token)
      .then(res => {
        setFollowingThisUser(res.data);
      })
      .catch(err => {
        console.log(err);
        alert("Unable to load information");
      })
  }

  function follow(e) {
    setLoading(true);

    api.setFollow(id,{ like_owner_id: id },token)
      .then(res => {
        setFollowingThisUser(true);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        alert("Unable to follow this user.");
      })
  }
  function unfollow(e) {
    setLoading(true);

    api.setUnfollow(id,token)
      .then(res => {
        setFollowingThisUser(false);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        alert("Unable to unfollow this user.");
      })
  }

  async function reloadPageInfoAfterRepostLike(postId) {
    let updatedReposts = [];
    let updatedCount = 0;

    try {
      const response = await api.getUserById(id, token);
      let newPosts =response.data.user_posts.slice();
      for (let index = 0; index < newPosts.length; index++) {
        const post = newPosts[index];
        if (post.is_repost && post.id === postId) {
          updatedReposts.push(post);
          updatedCount += 1;
        }
      }
      newPosts = newPosts.slice().filter(p => p.id !== postId);
      const finalPosts = sortPostsByDate([...updatedReposts, ...newPosts]);
      response.user_posts = finalPosts;
      setThisUser(response);
    } catch (err) {
      console.log(err);
      alert("An error occurred while trying to fetch the posts, please refresh the page");
    }
  }

  return (
    <MainTemplate
      src={thisUser?.photo || "/placeholder.jpg"}
      alt={thisUser?.name || "Loading.."}
      textHeader={thisUser ? thisUser.user_name + "’s posts" : "Loading..."}
      follow_btn_on_click={followingThisUser ? unfollow : follow}
      show_follow_btn={location.pathname.includes('/user') && id !== user.id}
      follow_btn_text={followingThisUser ? "Unfollow" : "Follow"}
      follow_btn_disabled={loading}
    >
      {!userNotFound &&
        <>
          {thisUser?.user_posts.length === 0 &&
            <h1 className='no-posts'>This user has no posts</h1>
          }
          {thisUser &&
            thisUser.user_posts.map(post => (
              <PostHolder
                key={post.is_repost ? post.repost_id + Date.now() : post.post_id + Date.now()}
                owner_id={thisUser.user_id}
                post_id={post.is_repost ? post.repost_id : post.post_id}
                description={post.description}
                like_count={post.likes_count}
                link={post.link}
                avatar_photo_url={thisUser.photo}
                name={thisUser.user_name}
                default_liked={post.default_liked}
                first_liker_name={post.first_liker_name}
                second_liker_name={post.second_liker_name}
                reload={reload}
                repost_count={post?.repost_count}
                created_at={post.created_at}
                is_repost={post.is_repost}
                references_post_id={post.is_repost ? post.id : -69}
                reposted_by_name={post.is_repost == false ? thisUser.user_name : post.is_repost && post.reposted_by_id === user.id ? "you" : post.is_repost && post.owner_id !== thisUser.id ? thisUser.user_name : ""}
                reload_reposts={reloadPageInfoAfterRepostLike}
                comments_count={post.comment_count}
              />
            ))
          }
        </>
      }
      {userNotFound &&
        <div className='not-found'>
          <h1>Error 404 : User not found</h1>
          <Button onClick={() => navigate('/timeline')}>Go back</Button>
        </div>
      }
    </MainTemplate>
  );
}