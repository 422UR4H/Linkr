import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import useTrending from '../Hooks/useTrending.js';
import useToken from '../Hooks/useToken.js';
import api from '../Services/api.js';
import Hashtag from './Atoms/Hashtag.jsx';
import { BiTrendingUp } from 'react-icons/bi';
import { useWindowSize } from '@uidotdev/usehooks';

export default function Trending() {
  const navigate = useNavigate();
  const { token } = useToken();
  const size = useWindowSize();
  const { trendingHashtags, setTrendingHashtags } = useTrending();

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setTrendingHashtags((await api.getAllHashtags(token)).data);
  }

  function goToHashtag(e) {
    const hashtag = e.target.textContent.slice(1);
    navigate(`/hashtag/${hashtag}`);
  }

  return (
    <StyledTrending data-test="trending">
      <h1>trending</h1>
      {size.width <= 720 && 
      
      <div className="trending-icon-container">
        <BiTrendingUp className='trending-icon'/>
      </div>
      
      }
      <div className="tags">
      
        {trendingHashtags?.length > 0 && trendingHashtags.map((hashtag, i) => (
          <Hashtag key={i} onClick={goToHashtag}>{hashtag}</Hashtag>
        ))}
      </div>
    </StyledTrending>
  );
}

const StyledTrending = styled.div`
  background-color: #171717;
  width: 301px;
  height: 406px;
  border-radius: 16px;


  .trending-icon-container{
    width: 70px;
    border-right: 1px solid  #484848;
    padding-right: 5px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;

    .trending-icon{
      color: white;
      font-size: 50px;
      flex-shrink: 0;
    }
  }
 
  h1{
    color: #FFF;
    font-family: 'Oswald', sans-serif;
    font-size: 27px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    display: auto;
    border-bottom: 1px solid #484848;
    padding: 12px;
    @media (max-width: 720px) {
      display: none;
    }
  }

  .tags{
    padding-left: 12px;
    padding-top: 22px;
    display: flex;
    flex-direction: column;
    gap: 7px;

    @media (max-width: 720px) {
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      padding-top: 10px;
      padding-left: 0;
      padding-bottom: 10px;
    }
  }

  @media (max-width: 720px) {
    width: 100%;
    height: auto;

    border-radius: 0;
    display: flex;
    gap: 10px;
    order: -1;
  }
`;