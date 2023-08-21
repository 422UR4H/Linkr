import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import useTrending from '../Hooks/useTrending.js';
import useToken from '../Hooks/useToken.js';
import api from '../Services/api.js';
import Hashtag from './Atoms/Hashtag.jsx';

export default function Trending() {
  const navigate = useNavigate();
  const { token } = useToken();
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
  
  h1{
    color: #FFF;
    font-family: 'Oswald', sans-serif;
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
  }
`;