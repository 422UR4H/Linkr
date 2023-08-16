import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { styled } from 'styled-components'
import Post from '../Components/Post';
import { useNavigate } from 'react-router-dom';

export default function UserPage() {
  const [thisUser,setThisUser] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(()=>{
    if(!localStorage.getItem("token")) return navigate('/');
    const token = `Bearer ${JSON.parse(localStorage.getItem("token")).token}`;
    axios.get(`${process.env.REACT_APP_API_URL}/user/${params.id}`,{ headers: { Authorization: token } })
    .then(res=>{
        setThisUser(res.data);
      }).catch((error) =>{
        console.log(error);
      });
  },[]);

  return (
    <PageContainer>
      <Content>
        <AvatarAndTitle>
          <img src={thisUser ? thisUser.photo : "/placeholder.jpg"} alt={thisUser ? thisUser.name : "Loading.."} />
          <h1>{thisUser ? thisUser.user_name+"’s posts" : "Loading..."}</h1>
        </AvatarAndTitle>
        <Posts>
          {thisUser && thisUser.user_posts.length == 0 && <h1 className='no-posts'>This user has no posts</h1>}
          {
            thisUser && thisUser.user_posts.map(post => (
              <Post 
                  key={post.post_id} 
                  owner_id={thisUser.user_id} 
                  post_id={post.post_id} 
                  description={post.description} 
                  like_count={post.likes_count} 
                  link={post.link}
                  avatar_photo_url={thisUser.photo}
                  name={thisUser.user_name}
                  default_liked={false}
                  metadata_description={post.metadata.description}
                  metadata_image={post.metadata.image}
                  metadata_title={post.metadata.title}
              />
          ))
          }
        </Posts>
      </Content>
    </PageContainer>
  )
}

const Posts = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 40px;

  .no-posts{
    color: #a1a1a1;
    font-size: 15px;
  }
`;

const Content = styled.div`

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 940px;

`;

const AvatarAndTitle = styled.div`
  
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 18px;
  width: 100%;
  margin-top: 53px;

  h1{
    color: #FFF;
    font-family: Oswald;
    font-size: 43px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  img{
    width: 50px;
    height: 50px;
    flex-shrink: 0;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const PageContainer = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;