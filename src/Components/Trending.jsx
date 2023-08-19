import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import useToken from '../Hooks/useToken.js';


export default function Trending({ trendingHashtags }) {
  const { token } = useToken();
  const navigate = useNavigate()

  function goToHashtag(e) {
    const hashtag = e.target.textContent.slice(1)
    navigate(`/hashtag/${hashtag}`);
  }

  return (
    <Container data-test="trending">
      <h1>trending</h1>
      <div className="tags">
        {trendingHashtags?.length > 0 && trendingHashtags.map((hashtag, i) => (
          <p onClick={goToHashtag} key={i} data-test="hashtag">#{hashtag}</p>
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
        &:hover{
          cursor:pointer;
        }
    }
  }
`;