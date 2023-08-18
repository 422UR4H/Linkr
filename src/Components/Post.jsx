import React, { useContext, useEffect, useRef, useState } from "react";
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
  reload,
  first_liker_name,
  second_liker_name,
}) {
  const placeholderImage = "/placeholder.jpg";
  const [liked, setLiked] = useState(default_liked);
  const [usePlaceholderImage, setUsePlaceholderImage] = useState(false);
  const [inEditMode, setInEditMode] = useState(false);
  const [descriptionEditValue, setDescriptionEditValue] = useState(description);
  const [likeCount, setLikeCount] = useState(Number(like_count));
  const editRef = useRef();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [showModal,setShowModal] = useState(false);

  useEffect(() => {
    validateMetadataImage();
    window.addEventListener("click", endEdit);
  }, []);

  function endEdit(event) {
    if (editRef.current && !event.target.classList.contains("edit-post")) {
      setInEditMode(false);
    }
  }
  function goToUser() {
    if (!owner_id) return alert("This post doenst have an owner_id prop");

    navigate(`/user/${owner_id}`);
  }

  function startEdit() {
    if (inEditMode) {
      setInEditMode(false);
    } else {
      setInEditMode(true);
    }
  }

  function askDelete() {
    //ask and then
    setShowModal(true);
  }

  function deleteThis() {
    const token = `Bearer ${JSON.parse(localStorage.getItem("token")).token}`;
    axios.delete(`http://localhost:5000/post/${post_id}`,{ headers: { Authorization: token }})
    .then(res => {
      console.log(res);
      setShowModal(false);
      reload();
    })
    .catch(err => {
      setShowModal(false);
      console.log(err);
      alert("Error deleting post!");
    })
  }

  function updatePost(e){
    e.preventDefault();
    alert("Implemente o axios do edit post!");
  }

  function finishEdit(e) {
    e?.preventDefault();
  }

  function like() {
    const token = `Bearer ${JSON.parse(localStorage.getItem("token")).token}`;
    setLiked(true);
    setLikeCount(likeCount+1);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/like/${post_id}`,
        { like_owner_id: user.id },
        { headers: { Authorization: token } }
      )
      .then((res) => {
        //console.log(res.data);
        reload();
      })
      .catch((err) => {
        setLikeCount(likeCount-1);
        setLiked(false);
        console.log(err);
      });
  }

  function dislike() {
    const token = `Bearer ${JSON.parse(localStorage.getItem("token")).token}`;
    setLiked(false);
    setLikeCount(likeCount-1);
    axios
      .delete(`${process.env.REACT_APP_API_URL}/dislike/${post_id}`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        //console.log(res.data); 
        reload();
      })
      .catch((err) => {
        setLiked(true);
        setLikeCount(likeCount+1);
        console.log(err);
      });
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

    const domainParts = link
      .toLowerCase()
      .replace("https://www.", "")
      .split(".");
    if (domainParts.length >= 1) {
      return capitalizeFirstLetter(domainParts[0]);
    } else {
      return "Title";
    }
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function transformTextWithHashtags(t) {
    const splittedTextBySpaces = t.split(' ');

    const transformedSegments = splittedTextBySpaces.map((textSegment, index) => {
      if (textSegment.includes('#')) return <a className="hashtag" href={`/hashtag/${textSegment.replace('#','')}`} key={index}>{textSegment + " "}</a>
      return textSegment + " ";
    });

    return transformedSegments;
  }
  function tooltipTextContent()
  {
    if(likeCount == 1 && default_liked) return "Você curtiu este post";
    if(likeCount == 2 && default_liked) return `Você e ${first_liker_name} curtiram este post`;
    if(likeCount == 3 && default_liked) return `Você, ${first_liker_name} e ${second_liker_name} curtiram este post`;
    if(likeCount >= 4 && default_liked) return `Você, ${first_liker_name},${second_liker_name} e outras ${likeCount - 3} pessoas curtiram este post`;

    if(likeCount == 1 && !default_liked) return `${first_liker_name} curtiu este post`;
    if(likeCount == 2 && !default_liked) return `${first_liker_name}} e ${second_liker_name} curtiram este post`;
    if(likeCount >= 3 && !default_liked) return `${first_liker_name} e ${second_liker_name} e outras ${likeCount - 2} pessoas curtiram este post`;

    // const sum = likeCount + (default_liked ? -1 : 0);
    // let text = default_liked ? "Você" : "";
    // text += `${first_liker_name &&  first_liker_name !== "" ? first_liker_name : ""}`
    // text += second_liker_name && second_liker_name !== "" ? "," + second_liker_name : "";
    // text +=  sum !== 0 && sum == 3 ? "outra pessoa" : sum > 3 ? `outras ${likeCount} pessoas` : "";
    // text += sum == 0 ? "" : sum > 1 ? " curtiram este post" : " curtiu este post";
    // return text;
  }

  return (
    <>
    {
      showModal &&

      <ModalAskDelete onClick={()=> setShowModal(false)}>
          <QuestionBox  onClick={(e)=> {e.stopPropagation();}}>
            <h1>Are you sure you want to delete this post?</h1>
            <div className="actions">
              <button onClick={(e)=> {e.stopPropagation(); setShowModal(false);}}>No, go back</button>
              <button onClick={(e)=> {e.stopPropagation(); deleteThis();}}>Yes, delete it</button>
            </div>
          </QuestionBox>
      </ModalAskDelete>
    }
    <PostContainer>
      {user && owner_id && user.id == owner_id && (
        <Actions>
          <AiFillEdit onClick={(e) => {startEdit(e); e.stopPropagation();}} className="icon" />
          <BiSolidTrashAlt onClick={askDelete} className="icon" />
        </Actions>
      )}
      <Tooltip id="tooltip likes" />
      <AvatarAndLikes>
        <img
          onClick={goToUser}
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
            data-tooltip-content={tooltipTextContent()}
          >
            {likeCount ? likeCount : 0} likes
          </span>
        </Likes>
      </AvatarAndLikes>
      <PostInfo>
        <h1 className="user-name" onClick={goToUser}>
          {name ? name : "Username"}
        </h1>
        {!inEditMode && <p>{description ? transformTextWithHashtags(description) : "Description"}</p>}
        {inEditMode && (
          <PostForm onBlur={finishEdit} onSubmit={(e) => updatePost(e)}>
            <input
              ref={editRef}
              onBlur={finishEdit}
              value={descriptionEditValue}
              type="text"
              placeholder="Description"
              className="edit-post"
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
              src={
                metadata_image && metadata_image !== "" && !usePlaceholderImage
                  ? metadata_image
                  : placeholderImage
              }
              alt=""
            />
          </div>
        </Metadata>
      </PostInfo>
    </PostContainer>
    </>
  );
}

const QuestionBox = styled.div`
  width: 100%;
  max-width: 597px;
  height: 100%;
  max-height: 262px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333333;
  flex-direction: column;
  border-radius: 50px;
  gap:20px;
  padding:20px;

  h1{
    color: #FFF;
    text-align: center;
    font-family: Lato;
    font-size: 34px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  .actions{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 100%;

    button{
      width: 100%;
      max-width:134px;
      height: 37px;
      color: white;
      border: 0;
      border-radius: 5px;
      background: #1877F2;

      &:hover{
        background: #FFF;
        color: #1877F2;
      }
    }
  }

`;

const ModalAskDelete = styled.main`

  width: 100%;
  height:100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  background: rgba(255, 255, 255, 0.90);
  display: flex;
  align-items:center;
  justify-content: center;
`;

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

  @media (max-width: 720px) {
    max-width: 100%;
    border-radius: 0;
  }
`;

const PostForm = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  input {
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

    a {
      color: #fff;
      font-family: Lato;
      font-size: 17px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      text-decoration: none;
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
  @media (max-width: 500px) {
    height: fit-content;
    max-height: fit-content;
  }

  .metadata-image {
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
  max-width: 327px;

  @media (max-width: 500px) {
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
    @media (max-width: 500px) {
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
    @media (max-width: 500px) {
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
    @media (max-width: 500px) {
      font-size: 9px;
    }
  }
`;
