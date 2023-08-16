import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { styled } from 'styled-components'

export default function UserPage() {
  const [thisUser,setThisUser] = useState(null);
  const params = useParams();

  useEffect(()=>{
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
          <img src={thisUser ? thisUser.photo : "https://i.kym-cdn.com/entries/icons/facebook/000/016/546/hidethepainharold.jpg"} alt={thisUser ? thisUser.name : "Juvenal"} />
          <h1>{thisUser ? thisUser.user_name : "Juvenal Juvêncio’s posts"}</h1>
        </AvatarAndTitle>
      </Content>
    </PageContainer>
  )
}

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