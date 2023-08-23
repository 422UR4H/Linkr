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


  useEffect(() => {
    if (!localStorage.getItem("token")) return navigate('/');
    checkIfThisUserIsFollowing();
    reload();
  }, []);

  async function reload() {
    api.getUserById(id, token)
      .then(res => {
        console.log(res.data);
        const userData = res.data;
        userData.user_posts = sortPostsByDate(userData.user_posts);
        setThisUser(userData);
      }).catch((error) => {
        console.log(error);
        setUserNotFound(true);
      });

    try {
      const responseHashtags = (await api.getAllHashtags(token)).data;
      setTrendingHashtags(responseHashtags);
    } catch (err) {
      console.log(err);
    }
  }

  function checkIfThisUserIsFollowing(){
    alert("Implement api call to check if this user logged in is following the user from this page!")
  }

  function follow(){
    alert(`Follow ${thisUser.id} as user ${id}`);
  }
  function unfollow(){
    alert(`Unfollow ${thisUser.id} as user ${id}`);
  }

  return (
    <MainTemplate
      src={thisUser?.photo || "/placeholder.jpg"}
      alt={thisUser?.name || "Loading.."}
      textHeader={thisUser ? thisUser.user_name + "’s posts" : "Loading..."}
      follow_btn_on_click={followingThisUser ? unfollow : follow}
      show_follow_btn={location.pathname.includes('/user')}
      follow_btn_text={followingThisUser? "Unfollow" : "Follow"}
    >
      {!userNotFound &&
        <>
          {thisUser?.user_posts.length === 0 &&
            <h1 className='no-posts'>This user has no posts</h1>
          }
          {thisUser &&
            thisUser.user_posts.map(post => (
              <Post
                key={post.is_repost ?post.repost_id : post.post_id}
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
                reposted_by_name={post.is_repost == false ? "" : post.is_repost && post.reposted_by_id === user.id ? "you" :  post.is_repost && post.owner_id !== thisUser.id ?  thisUser.user_name : ""}
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