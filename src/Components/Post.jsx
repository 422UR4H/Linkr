import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AiFillHeart, AiOutlineHeart, AiFillEdit } from "react-icons/ai";
import { BiSolidTrashAlt } from "react-icons/bi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../Contexts/UserContext";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

export default function Post({
  post_id,
  owner_id,
  name,
  avatar_photo_url,
  like_count,
  description,
  link,
  default_liked = false,
  metadata_image,
  metadata_title,
  metadata_description,
}) {
  const placeholderImage = "/placeholder.jpg";
  const [liked, setLiked] = useState(default_liked);
  const [usePlaceholderImage, setUsePlaceholderImage] = useState(false);
  const [inEditMode, setInEditMode] = useState(false);
  const [descriptionEditValue, setDescriptionEditValue] = useState(description);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(()=>{
    validateMetadataImage();
  },[])

  function goToUser() {
    if (!owner_id) return alert("This post doenst have an owner_id prop");

    navigate(`/user/${owner_id}`);
  }

  function startEdit() {
    setInEditMode(true);
  }

  function askDelete() {
    //ask and then

    deleteThis();
  }

  function deleteThis() {
    // axios.delete(`${process.env.REACT_APP_API_URL}/posts/${post_id}`)
    // .then(res => {
    //     console.log(res);
    // })
    // .catch(err => {
    //     console.log(err);
    // })
  }

  function finishEdit(e) {
    e?.preventDefault();
    // axios.patch(`${process.env.REACT_APP_API_URL}/posts/${post_id}`, { description: descriptionEditValue })
    // .then(res => {
    //     console.log(res.data);
    //     setInEditMode(false);
    // })
  }

  function like() {
    // axios.post(`${process.env.REACT_APP_API_URL}/like/${post_id}`)
    // .then(res => {
    //     console.log(res);
    //     setLiked(true);
    //   })
    // .catch(err => {
    //     console.log(err);
    // })
  }

  function dislike() {
    // axios.post(`${process.env.REACT_APP_API_URL}/dislike/${post_id}`)
    // .then(res => {
    //     console.log(res);
    //     setLiked(false);
    //   })
    // .catch(err => {
    //     console.log(err);
    // })
  }

  async function validateMetadataImage() {
    if (!metadata_image) return;
    try {
        await validateUrl(metadata_image);
    } catch (error) {
      setUsePlaceholderImage(true);
    }
      
}

async function validateUrl(url) {
  return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = function () {
          resolve(true);
      };
      img.onerror = function () {
          reject(false);
      };
      img.src = url;
  });
}

  function createdLinkTitle(link) {
    if (link.includes("instagram.com")) {
      return "Instagram";
    } else if (link.includes("twitter.com")) {
      return "Twitter";
    } else if (link.includes("facebook.com")) {
      return "Facebook";
    } else if (link.includes("youtube.com")) {
      return "Youtube";
    } else if (link.includes("tiktok.com")) {
      return "Tiktok";
    } else if (link.includes("pinterest.com")) {
      return "Pinterest";
    } else if (link.includes("linkedin.com")) {
      return "Linkedin";
    } else if (link.includes("reddit.com")) {
      return "Reddit";
    } else if (link.includes("tumblr.com")) {
      return "Tumblr";
    }

    return extractDomain(link);
  }

  function extractDomain(link) {
    if (typeof link !== "string" || link.trim() === "") {
      return "Title";
    }

    const domainParts = link.toLowerCase().replace("https://www.", "").split(".");
    if (domainParts.length >= 1) {
      return capitalizeFirstLetter(domainParts[0]);
    } else {
      return "Title";
    }
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <PostContainer>
      {user && owner_id && user.id == owner_id && (
        <Actions>
          <AiFillEdit onClick={startEdit} className="icon" />
          <BiSolidTrashAlt className="icon" />
        </Actions>
      )}
      <Tooltip id="tooltip likes" />
      <AvatarAndLikes>
        <img
          src={avatar_photo_url ? avatar_photo_url : placeholderImage}
          alt={name}
        />
        <Likes>
          {liked ? (
            <AiFillHeart onClick={dislike} className="like-btn full" />
          ) : (
            <AiOutlineHeart onClick={like} className="like-btn empty" />
          )}
          <span
            data-tooltip-id="tooltip likes"
            data-tooltip-content={`Você, ${like_count - 1} e ${
              like_count - 1 === 1 ? "outra pessoa" : "outras pessoas"
            } curtiram isso`}
          >
            {like_count ? like_count : 0} likes
          </span>
        </Likes>
      </AvatarAndLikes>
      <PostInfo>
        <h1 className="user-name" onClick={goToUser}>
          {name ? name : "Username"}
        </h1>
        {!inEditMode && <p>{description ? description : "Description"}</p>}
        {inEditMode && (
          <PostForm onBlur={finishEdit} onSubmit={(e) => finishEdit(e)}>
            <textarea
              onBlur={finishEdit}
              value={descriptionEditValue}
              type="text"
              placeholder="Description"
              onChange={(e) => setDescriptionEditValue(e.target.value)}
            />
          </PostForm>
        )}
        <Metadata>
          <MetadataInfo>
            <h1 className="metadata-title">
              {metadata_title && metadata_title !== ""
                ? metadata_title
                : createdLinkTitle(link)}
            </h1>
            <h2 className="metadata-description">
              {metadata_description ? metadata_description : "Description"}
            </h2>
            <a onClick={() => window.open(link)} href={link} target="_blank">
              {link}
            </a>
          </MetadataInfo>
         <div className="metadata-image">
          <img
              onClick={goToUser}
              src={
               ( metadata_image && metadata_image !== "" && !usePlaceholderImage)
                  ? metadata_image
                  : placeholderImage
              }
              alt=""
            />
         </div>
        </Metadata>
      </PostInfo>
    </PostContainer>
  );
}

const PostContainer = styled.div`

  width: 100%;
  max-width: 611px;
  background-color: #171717;
  border-radius: 16px;
  display: flex;
  gap: 18px;
  padding: 20px;
  position: relative;
  margin-bottom: 10px;

  @media (max-width:500px) {
    max-width: 100%;
    border-radius: 0;
  }
`;

const PostForm = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  textarea {
    width: 100%;
    padding: 10px;
    border-radius: 7px;
    background: #fff;
    border: none;
    outline: none;
    color: black;
    resize: none;
  }
`;

const Actions = styled.nav`
  position: absolute;
  right: 20px;
  top: 20px;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;

  .icon {
    color: white;
    cursor: pointer;

    &:hover {
      opacity: 50%;
    }
  }
`;

const AvatarAndLikes = styled.div`
  * {
    user-select: none;
  }
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  justify-content: flex-start;

  img {
    width: 50px;
    height: 50px;
    flex-shrink: 0;
    border-radius: 26.5px;
    object-fit: cover;
    cursor: pointer;
  }
`;

const Likes = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 4px;
  font-size: 20px;

  * {
    user-select: none;
  }

  .full {
    color: red;
  }

  .empty {
    color: white;
  }

  .like-btn {
    cursor: pointer;
  }

  span {
    color: #fff;
    text-align: center;
    font-family: Lato;
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  height: fit-content;
  gap: 7px;
  width: 100%;

  .user-name {
    color: #fff;
    font-family: Lato;
    font-size: 19px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    cursor: pointer;
    width: fit-content;

    &:hover {
      text-decoration: underline;
    }
  }

  p {
    color: #b7b7b7 !important;
    font-family: Lato !important;
    font-size: 17px !important;
    font-style: normal !important;
    font-weight: 400 !important;
    line-height: normal !important;

    span {
      color: #fff;
      font-family: Lato;
      font-size: 17px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
  }
`;

const Metadata = styled.div`
  display: flex;
  width: 100%;
  max-width: 503px;
  max-height: 155px;
  flex-shrink: 0;
  border-radius: 11px;
  border: 1px solid #4d4d4d;
  overflow: hidden;
  justify-content: space-between;
  text-decoration: none !important;
  @media (max-width:500px) {
      height: fit-content;
      max-height: fit-content;
  }

  .metadata-image{
    width: 100%;
    max-width: 153.44px;
    border-radius: 0px 12px 13px 0px;
    overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        border-radius: 0px 12px 13px 0px;
        object-fit: cover;
    }
  }
  
`;

const MetadataInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 10px;

  @media (max-width:500px) {
      padding: 7px;
      height: fit-content;
  }

  a {
    color: #cecece;
    font-family: Lato;
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    @media (max-width:500px) {
      font-size: 9px;
    }
  }

  h1 {
    width: 100%;
    color: #cecece;
    font-family: Lato;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    @media (max-width:500px) {
      font-size: 11px;
    }
    
  }

  h2 {
    width: 100%;
    color: #9b9595;
    font-family: Lato;
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    @media (max-width:500px) {
      font-size: 9px;
    }
  }
`;
