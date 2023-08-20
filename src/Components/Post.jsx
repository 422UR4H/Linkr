import { useContext, useEffect, useRef, useState } from "react";
import { AiFillHeart, AiOutlineHeart, AiFillEdit } from "react-icons/ai";
import { BiSolidTrashAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { styled } from "styled-components";
import "react-tooltip/dist/react-tooltip.css";
import UserContext from "../Contexts/UserContext";
import useToken from "../Hooks/useToken.js";
import api from "../Services/api.js";
import axios from "axios";


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
  const [descriptionEditValue, setDescriptionEditValue] = useState(description ? description : "");
  const [usePlaceholderImage, setUsePlaceholderImage] = useState(false);
  const [isToggleLiking, setIsToggleLiking] = useState(false);
  const [likeCount, setLikeCount] = useState(Number(like_count));
  const [liked, setLiked] = useState(default_liked);
  const [showModal, setShowModal] = useState(false);
  const [editInput, setEditInput] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { user } = useContext(UserContext);
  const { token } = useToken();
  const editRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    validateMetadataImage();
    window.addEventListener("click", endEdit);
    if (editRef.current) editRef.current.focus();
  }, [editInput]);

  function endEdit(event) {
    if (editRef.current && !event.target.classList.contains("edit-post")) {
      setEditInput(false);
    }
  }
  function goToUser() {
    if (!owner_id) return alert("This post doenst have an owner_id prop");

    navigate(`/user/${owner_id}`);
  }

  function startEdit(event) {
    event.stopPropagation();

    setEditInput(!editInput);
  }

  function askDelete() {
    //ask and then
    setShowModal(true);
  }

  function deleteThis() {
    if (deleting) return;
    setDeleting(true);
    axios.delete(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/post/${post_id}`, { headers: { Authorization: token } })
      .then(res => {
        setDeleting(false);
        setShowModal(false);
        reload(true);
      })
      .catch(err => {
        setShowModal(false);
        setDeleting(false);
        console.log(err);
        alert("Error deleting post!");
      })
  }

  function extractTextWithHashtagsSplitedByComa(text_to_extract) {
    if (!text_to_extract) return "";
    const splittedTextBySpaces = text_to_extract.split(' ');
    const transformedSegments = [];
    splittedTextBySpaces.map((textSegment, index) => {
      if (textSegment.includes('#')) transformedSegments.push(textSegment.replace('#', ''));
    });
    const joinedText = transformedSegments.join(',');
    return joinedText;
  }

  function updatePost(e) {
    e.preventDefault();

    setEditInput(false);
    if (descriptionEditValue === description) return;

    const hashtags = extractTextWithHashtagsSplitedByComa(descriptionEditValue);
    const body = { description: descriptionEditValue, hash_tags: hashtags };
    if (body.hash_tags === "") delete body.hash_tags;
    api.editPost(body, token, post_id)
      .then(res => {
        setShowModal(false);
        reload(true);
      })
      .catch(err => {
        setShowModal(false);
        console.log(err);
        alert("Error editing your post!");
      })
  }

  function toggleLike() {
    if (isToggleLiking) return;
    setIsToggleLiking(true);
    setLiked(!liked);

    if (!liked) {
      setLikeCount(likeCount + 1);

      api.setLike(post_id, { like_owner_id: user.id }, token)
        .catch((err) => {
          setLikeCount(likeCount - 1);
          setLiked(false);
          console.log(err);
        })
        .finally(() => setIsToggleLiking(false));
    } else {
      setLikeCount(likeCount - 1);

      api.setUnlike(post_id, token)
        .catch((err) => {
          setLikeCount(likeCount + 1);
          setLiked(true);
          console.log(err);
        })
        .finally(() => setIsToggleLiking(false));
    }
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
    if (!t) return "";

    const splittedTextBySpaces = t.split(' ');
    const transformedSegments = splittedTextBySpaces.map((textSegment, index) => {
      if (textSegment.includes('#')) return <a className="hashtag" href={`/hashtag/${textSegment.replace('#', '')}`} key={index}>{textSegment + " "}</a>
      return textSegment + " ";
    });

    return transformedSegments;
  }
  function tooltipTextContent() {
    if (likeCount == 1 && liked) return "Você curtiu este post";
    if (likeCount == 2 && liked) return `Você e ${first_liker_name} curtiram este post`;
    if (likeCount == 3 && liked) return `Você, ${first_liker_name} e ${second_liker_name} curtiram este post`;
    if (likeCount >= 4 && liked) return `Você, ${first_liker_name},${second_liker_name} e outras ${likeCount - 3} pessoas curtiram este post`;

    if (likeCount == 1 && !liked) return `${first_liker_name} curtiu este post`;
    if (likeCount == 2 && !liked) return `${first_liker_name} e ${second_liker_name} curtiram este post`;
    if (likeCount >= 3 && !liked) return `${first_liker_name} e ${second_liker_name} e outras ${likeCount - 2} pessoas curtiram este post`;

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

        <ModalAskDelete onClick={() => setShowModal(false)}>
          <QuestionBox onClick={(e) => { e.stopPropagation(); }}>
            <h1>Are you sure you want to delete this post?</h1>
            <div className="actions">
              <button onClick={(e) => { e.stopPropagation(); setShowModal(false); }} data-test="cancel">No, go back</button>
              <button disabled={deleting} onClick={(e) => { e.stopPropagation(); deleteThis(); }} data-test="confirm">{deleting ? "Wait.." : "Yes, delete it"}</button>
            </div>
          </QuestionBox>
        </ModalAskDelete>
      }
      <PostContainer data-test="post">
        {user && owner_id && user.id == owner_id && (
          <Actions>
            <AiFillEdit onClick={(e) => startEdit(e)} className="icon" data-test="edit-btn" />
            <BiSolidTrashAlt onClick={askDelete} className="icon" data-test="delete-btn" />
          </Actions>
        )}
        <Tooltip id="tooltip likes" data-test="tooltip" />
        <AvatarAndLikes>
          <img
            onClick={goToUser}
            src={avatar_photo_url ? avatar_photo_url : placeholderImage}
            alt={name}
          />
          <Likes onClick={toggleLike} data-test="like-btn">
            {liked ? (
              <AiFillHeart className="like-btn full" />
            ) : (
              <AiOutlineHeart className="like-btn empty" />
            )}
          </Likes>
          <span
            data-tooltip-id="tooltip likes"
            data-tooltip-content={tooltipTextContent()}
            // data-test="tooltip"
            data-test="counter"
          >
            {likeCount ? likeCount : 0} likes
          </span>
        </AvatarAndLikes>
        <PostInfo>
          <h1 className="user-name" onClick={goToUser} data-test="username">
            {name ? name : "Username"}
          </h1>
          {!editInput && <p data-test="description">{transformTextWithHashtags(description)}</p>}
          {editInput &&
            <PostForm onSubmit={(e) => updatePost(e)}>
              <input
                ref={editRef}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setEditInput(false);
                  }
                }}
                onBlur={(e) => endEdit(e)}
                value={descriptionEditValue}
                type="text"
                placeholder="Description"
                className="edit-post"
                onChange={(e) => setDescriptionEditValue(e.target.value)}
                data-test="edit-input"
              />
            </PostForm>
          }
          <Metadata data-test="link" href={link} target="_blank">
            <MetadataInfo>
              <h1 className="metadata-title">
                {metadata_title && metadata_title !== ""
                  ? metadata_title
                  : createdLinkTitle(link)}
              </h1>
              <h2 className="metadata-description">
                {metadata_description ? metadata_description : "Description"}
              </h2>
              <span /*onClick={() => window.open(link)} href={link} target="_blank"*/>
                {link.trim()}
              </span>
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

      &:enabled{
          &:hover{
          background: #FFF;
          color: #1877F2;
        }
      }
      &:disabled{
        opacity: 50%;
        cursor: not-allowed;
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
  gap: 4px;
  justify-content: flex-start;

  img {
    width: 50px;
    height: 50px;
    flex-shrink: 0;
    border-radius: 26.5px;
    object-fit: cover;
    cursor: pointer;
  }

  span {
    color: #fff;
    text-align: center;
    font-family: 'Lato';
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

const Likes = styled.button`
  background-color: inherit;
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 20px;
  margin-top: 16px;
  border: none;
  padding: 0;

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

const Metadata = styled.a`
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

  span {
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
