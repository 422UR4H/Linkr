import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Trending() {
  
  const token = `Bearer ${JSON.parse(localStorage.getItem("token")).token}`;
  const [trendingHashtags, setTrendingHashtags] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {

      async function getApiTrending(){
        try {
          const response = await axios
          .get(`http://localhost:5000/hashtags`, {
            headers: { Authorization: token }
          })
          setTrendingHashtags(response.data);
        } catch (error) {
          console.error(error);
        }
      }
      getApiTrending()

  }, [])

  function goToHashtag(e){
    const hashtag = e.target.textContent.slice(1)
    navigate(`/hashtag/${hashtag}`);
  }

    return (
        <Container>
            <h1>trending</h1>
            <div className="tags">
                {trendingHashtags && trendingHashtags.map((hashtag, i) => (
                  <p onClick={goToHashtag} key={i}>#{hashtag}</p>
                ))}
            </div>
        </Container>
    )
}

const Container = styled.div`
  width: 301px;
  height: 406px;
  border-radius: 16px;
  flex-shrink: 0;
  background: #171717;
  
  h1{
    color: #FFF;
    font-family: Oswald;
    font-size: 27px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    border-bottom: 1px solid #484848;
    padding: 12px;
  }

  .tags{
    padding-left: 12px;
    padding-top: 22px;
    display: flex;
    flex-direction: column;
    gap: 7px;
      p{
        color: #FFF;
        font-family: Lato;
        font-size: 19px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: 0.95px;
    }
  }
`;