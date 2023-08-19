import { styled } from "styled-components";
import CreatePost from "../Components/CreatePost";
import { useEffect, useState } from "react";
import axios from "axios";
import Post from "../Components/Post";
import SearchBar from "../Components/SearchBar";
import { useWindowSize } from "@uidotdev/usehooks";
import { useNavigate } from "react-router-dom";
import Trending from "../Components/Trending";

export default function Timeline() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const size = useWindowSize();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) return navigate("/");
    reload();
  }, []);

  function reload() {
    setLoading(true);
    const token = `Bearer ${JSON.parse(localStorage.getItem("token")).token}`;
    axios
      .get(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/timeline`, {
        headers: { Authorization: token },
      })
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(true);
      });
  }

  return (
    <PageContainer>
      <ContainerTimeline>
        {size.width <= 720 && <SearchBar className={"search-bar"} />}
        <Title>
          <h1>timeline</h1>
        </Title>

        <Content>
          <SCTimeline>
            <CreatePost reload={reload} />
            {loading ? (
              <p className="loading">Loading...</p>
            ) : error ? (
              <p>
                An error occured while trying to fetch the posts, please refresh the page
              </p>
            ) : posts.length === 0 ? (
              <p data-test="message">There are no posts yet.</p>
            ) : (
              posts.map((post) => (
                <Post
                  reload={reload}
                  key={post.id}
                  avatar_photo_url={post.user_photo}
                  name={post.user_name}
                  description={post.description}
                  like_count={post.likes_count}
                  link={post.link}
                  owner_id={post.owner_id}
                  post_id={post.id}
                  default_liked={post.default_liked}
                  metadata_title={post.metadata.title}
                  metadata_description={post.metadata.description}
                  metadata_image={post.metadata.image}
                  first_liker_name={post.first_liker_name}
                  second_liker_name={post.second_liker_name}
                />
              ))
            )}
          </SCTimeline>
          {size.width > 720 && <Trending />}
        </Content>
      </ContainerTimeline>
    </PageContainer>
  );
}

const SCTimeline = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 611px;
  .loading{
    font-size: 40px;
    color: white;
    font-family: Oswald;
    margin-top: 20px;
  }
  @media (max-width: 720px) {
    width: 100%;
  }
  
`;

const Title = styled.div`
  max-width: 930px;
  width: 100%;
  text-align: start;
  padding: 15px;
  h1 {
    font-family: "Oswald", sans-serif;
    color: #ffffff;
    font-size: 43px;
    font-weight: 700;
    line-height: 64px;
  }
  @media (max-width: 720px) {
      display: flex;
      justify-content: center;
      h1 {
        width: 611px;
      }
  }
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  gap: 25px;
  justify-content: center;
`;


const PageContainer = styled.main`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
`;
const ContainerTimeline = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: calc(100% - 20px);
  @media (max-width: 720px) {
    max-width: 100%;
  }
  p {
    color: #707070;
    font-size: 40px;
  }
  .search-bar {
    margin-top: 10px;
    max-width: calc(100% - 20px) !important;
  }
`;
