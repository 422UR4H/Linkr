import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { styled } from 'styled-components'
import useToken from '../Hooks/useToken';
import useTrending from '../Hooks/useTrending.js';
import Post from '../Components/Post';
import api from '../Services/api';
import MainTemplate from '../Components/Templates/MainTemplate.jsx';
import Button from '../Styles/Button.js';


export default function UserPage() {
  const [thisUser, setThisUser] = useState(null);
  const [userNotFound, setUserNotFound] = useState(false);
  const { setTrendingHashtags } = useTrending();
  const { id } = useParams();
  const { token } = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) return navigate('/');
    reload();
  }, []);

  async function reload() {
    api.getUserById(id, token)
      .then(res => {
        setThisUser(res.data);
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

  return (
    <MainTemplate
      src={thisUser?.photo || "/placeholder.jpg"}
      alt={thisUser?.name || "Loading.."}
      textHeader={thisUser ? thisUser.user_name + "’s posts" : "Loading..."}
    >
      <StyledUserPage>
        {!userNotFound &&
          <Posts>
            {thisUser?.user_posts.length === 0 &&
              <h1 className='no-posts'>This user has no posts</h1>
            }
            {thisUser &&
              thisUser.user_posts.map(post => (
                <Post
                  key={post.post_id}
                  owner_id={thisUser.user_id}
                  post_id={post.post_id}
                  description={post.description}
                  like_count={post.likes_count}
                  link={post.link}
                  avatar_photo_url={thisUser.photo}
                  name={thisUser.user_name}
                  default_liked={post.default_liked}
                  metadata_description={post.metadata?.description}
                  metadata_image={post.metadata?.image}
                  metadata_title={post.metadata?.title}
                  first_liker_name={post.first_liker_name}
                  second_liker_name={post.second_liker_name}
                  reload={reload}
                />
              ))
            }
          </Posts>
        }
        {userNotFound &&
          <div className='not-found'>
            <h1>Error 404 : User not found</h1>
            <Button onClick={() => navigate('/timeline')}>Go back</Button>
          </div>
        }
      </StyledUserPage>
    </MainTemplate>
  );
}

const Posts = styled.div`
  .no-posts{
    color: #a1a1a1;
    font-size: 15px;
  }
`;

const StyledUserPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .not-found {
    color: white;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: Oswald;
    font-size: 30px;
    white-space: nowrap;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;
  }
`;