import React, { useContext, useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import UserContext from "../Contexts/UserContext";
import axios from "axios";

export default function CreatePost({reload}) {
  const { user } = useContext(UserContext);
  const [linkPost, setlinkPost] = useState("");
  const [descriptionPost, setdescriptionPost] = useState("");
 
  function createPost(text_to_extract) {
    console.log(linkPost);
    console.log(descriptionPost);
    console.log(user);

    if(linkPost === "") {
      return;
    }

    const hashtags = extractTextWithHashtagsSplitedByComa(descriptionPost);
    const body = {"description" : descriptionPost, "link" : linkPost, "hash_tags" : hashtags};
    const token = `Bearer ${JSON.parse(localStorage.getItem("token")).token}`;
    axios.post(`http://localhost:5000/post/`,body,{ headers: { Authorization: token }})
        .then(res => {
          console.log(res);
          setlinkPost("");
          setdescriptionPost("");
          reload();
        })
        .catch(err => {
          console.log(err);
          alert("Error publishing your link");
        })
  }

  function extractTextWithHashtagsSplitedByComa(text_to_extract) {
    const splittedTextBySpaces = text_to_extract.split(' ');
    const transformedSegments = [];
    splittedTextBySpaces.map((textSegment, index) => {
      if (textSegment.includes('#')) transformedSegments.push(textSegment.replace('#', ''));
    });
    const joinedText = transformedSegments.join(',');
    return joinedText;
  }

  return (
    <Container data-test="publish-box">
      <ContainerCreatePost>
        <img
          src={user ? user.photo : "/placeholder.jpg"}
          alt={user ? user.name : "loading"}
        />
        <div className="container2">
          <div>
            <h2>What are you going to share today?</h2>
            <input
              required
              type="text"
              placeholder="http://..."
              value={linkPost}
              onChange={(e) => setlinkPost(e.target.value)}
              data-test="link"
            ></input>
            <input
                type="text"
                placeholder="Awesome article about #javascript"
                value={descriptionPost}
                onChange={(e) => setdescriptionPost(e.target.value)}
                data-test="description"
            ></input>

          </div>
          <StyledButton onClick={()=> createPost()}>
            <button data-test="publish-btn">Publish</button>
          </StyledButton>
        </div>
      </ContainerCreatePost>
    </Container>
  );
}

const Container = styled.div`
  max-width: 611px;
  width: 100%;
  @media (max-width: 720px) {
    max-width: 100%;
  }
  .container2 {
    width: 100%;
    height: fit-content;
  }
`;

const ContainerCreatePost = styled.div`
  display: flex;
  width: 100%;
  min-height: 209px;
  border-radius: 16px;
  padding: 10px;
  background-color: #ffffff;
  box-shadow: 0px 4px 4px 0px #00000040;
  margin-bottom: 20px;
  padding-right: 22px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 27px;
    padding: 10px;
    object-fit: cover;
  }
  h2 {
    font-family: "Lato", sans-serif;
    padding: 10px 0 15px 0;
    color: #707070;
    font-size: 20px;
    font-weight: 300;
    line-height: 24px;
  }
  input {
    width: 100%;
    height: 13px;
    padding: 15px;
    margin-bottom: 5px;
    background-color: #efefef;
    border-radius: 5px;
    border: none;
    font-family: "Lato", sans-serif;
    font-size: 15px;
    font-weight: 300;
    line-height: 18px;
    &:focus {
      outline: none;
    }
  }
  textarea {
    height: 66px;
    resize: none;
    width: 100%;
    font-size: 15px;
    font-weight: 300;
    border-radius: 5px;
    background-color: #efefef;
    border: none;
    padding: 10px;
    &:focus {
      outline: none;
    }
  }

  @media (max-width: 720px) {
    border-radius: 0;
    padding-right: 10px;
    
    img {
      display: none;
      
    }
    h2 {
      text-align: center;
    }
  }
`;

const StyledButton = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 5px;
  button {
    width: 112px;
    height: 31px;
    border-radius: 5px;
    color: white;
    border: none;
    background-color: #1877f2;
    font-family: "Lato", sans-serif;
    font-size: 14px;
    font-weight: 700;
    line-height: 17px;
    &:hover {
      cursor: pointer;
      background-color: #86bbff;
    }
  }
`;
