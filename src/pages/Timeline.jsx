import { styled } from "styled-components";
import CreatePost from "../styles/components/CreatePost";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useState } from "react";
export default function Timeline() {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(1);

  const handleLikeClick = () => {
    if (!liked) {
      setLiked(true);
      setLikesCount(likesCount + 1);
    } else {
      setLiked(false);
      setLikesCount(likesCount - 1);
    }
  };
  return (
    <>
      <CreatePost />
      <ContainerPost>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <ContainerImage>
            <img
              src="https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/2022.png"
              alt=""
            />
          </ContainerImage>
          <Likes>
            {liked ? (
              <AiFillHeart
                style={{ color: "red", cursor: "pointer" }}
                onClick={handleLikeClick}
              />
            ) : (
              <AiOutlineHeart
                style={{ color: "white", cursor: "pointer" }}
                onClick={handleLikeClick}
              />
            )}
            <p>
              {likesCount} like{likesCount !== 1 ? "s" : ""}
            </p>
          </Likes>
        </div>
        <div>
          <div>
            <h3>Nome da pessoa</h3>
            <h4>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </h4>
          </div>
        </div>
      </ContainerPost>
    </>
  );
}

const ContainerPost = styled.div`
  display: flex;
  background-color: #171717;
  width: 611px;
  height: 209px;
  border-radius: 16px;
  padding-bottom: 15px;

  h3 {
    font-family: "Lato", sans-serif;
    font-size: 19px;
    font-weight: 400;
    line-height: 23px;
    padding: 20px 0 15px 0;
    color: #ffffff;
  }
  h4 {
    font-family: "Lato", sans-serif;
    font-size: 17px;
    font-weight: 400;
    line-height: 20px;
    color: #b7b7b7;
  }
`;

const ContainerImage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 50px;
    height: 50px;
    border-radius: 27px;
    padding: 10px;
  }
`;

const Likes = styled.div`
  width: 50px;
  height: 30px;
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    font-family: "Lato", sans-serif;
    font-size: 11px;
    font-weight: 400;
    line-height: 13px;
    color: #ffffff;
  }
`;
