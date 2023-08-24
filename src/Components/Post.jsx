import { useContext, useEffect, useRef, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { BiSolidTrashAlt } from "react-icons/bi";
import { Tooltip } from "react-tooltip";
import { styled } from "styled-components";
import "react-tooltip/dist/react-tooltip.css";
import { PLACEHOLDER_IMAGE } from "../Utils/constants";
import api from "../Services/api.js";
import { useNavigate } from "react-router-dom";
import UserContext from "../Contexts/UserContext";
import useToken from "../Hooks/useToken";
import { checkForEscapeKeyPress, extractTextWithHashtagsSplitedByComa, transformTextWithHashtags, validateImageUrl } from "../Utils/utils";
import PostUserAction from "./PostUserAction";
import Metadata from "./Metadata";
import Modal from "./Modal";
import RepostBanner from "./RepostBanner";

export default function Post({
  post_id,
  owner_id,
  name,
  avatar_photo_url,
  like_count,
  description,
  link,
  default_liked = false,
  reload,
  first_liker_name,
  second_liker_name,
  repost_count,
  comments_count,
  references_post_id,
  created_at,
  is_repost = false,
  reposted_by_name,
  reload_reposts
}) {
  const [descriptionEditValue, setDescriptionEditValue] = useState(description ? description : "");
  const [isToggleLiking, setIsToggleLiking] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [repostCount, setRepostCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [liked, setLiked] = useState(default_liked);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalRepost, setShowModalRepost] = useState(false);
  const [editInput, setEditInput] = useState(false);

  const [deleting, setDeleting] = useState(false);
  const [reposting, setReposting] = useState(false);
  const [validAvatarUrl, setValidAvatarUrl] = useState(false);

  const editRef = useRef();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { token } = useToken();

  useEffect(() => {
    validateAndSetAvatarImage();
    setRepostCount(repost_count ? Number(repost_count) : 0);
    setLikeCount(like_count ? Number(like_count) : 0);
    setCommentsCount(comments_count ? Number(comments_count) : 0);
  }, []);

  useEffect(() => {
    window.addEventListener("click", endEdit);
    if (editRef.current) editRef.current.focus();
  }, [editInput]);

  function validateAndSetAvatarImage() {
    if (avatar_photo_url) {
      validateImageUrl(avatar_photo_url)
        .then((res) => {
          setValidAvatarUrl(true);
        })
        .catch((err) => {
          setValidAvatarUrl(false);
        });
    }
  }
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
    if (is_repost) return;
    setEditInput(!editInput);
  }

  function askDelete() {
    //ask and then
    setShowModalDelete(true);
  }

  function askRepost() {
    //ask and then
    setShowModalRepost(true);
  }

  function repost() {
    setReposting(true);
    api.repost(is_repost ? references_post_id : post_id, token)
      .then(res => {
        setShowModalRepost(false);
        setReposting(false);
        reload();
      })
      .catch(err => {
        setShowModalRepost(false);
        setReposting(false);
        console.log(err);
        alert("Error reposting!");
      })
  }

  function deleteThis() {
    if (deleting) return;
    setDeleting(true);

    if (is_repost) {
      api.deleteRepost(token, post_id)
        .then(res => {
          setDeleting(false);
          setShowModalDelete(false);
          reload();
        })
        .catch(err => {
          setDeleting(false);
          setShowModalDelete(false);
          console.log(err);
          alert("Error deleting!");
        })
    }
    else {
      api.deletePost(token, post_id)
        .then(res => {
          setDeleting(false);
          setShowModalDelete(false);
          reload();
        })
        .catch(err => {
          setShowModalDelete(false);
          setDeleting(false);
          console.log(err);
          alert("Error deleting post!");
        })
    }
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
        setShowModalDelete(false);
        reload(true);
      })
      .catch(err => {
        setShowModalDelete(false);
        console.log(err);
        alert("Error editing your post!");
      })
  }

  function startToComment() {
    return alert("Not implemented yet!");
  }

  function toggleLike() {
    if (isToggleLiking) return;
    setIsToggleLiking(true);
    setLiked(!liked);
    const postIdToLike = is_repost ? references_post_id : post_id;

    if (!liked) {
      setLikeCount(likeCount + 1);

      api.setLike(postIdToLike, { like_owner_id: user.id }, token)
        .catch((err) => {
          setLikeCount(likeCount - 1);
          setLiked(false);
          console.log(err);
        })
        .finally(() => {
          setIsToggleLiking(false);
          if(is_repost){
            reload_reposts(postIdToLike);
          }
        });
    } else {
      setLikeCount(likeCount - 1);

      api.setUnlike(postIdToLike, token)
        .catch((err) => {
          setLikeCount(likeCount + 1);
          setLiked(true);
          console.log(err);
        })
        .finally(() => {
          setIsToggleLiking(false);
          if(is_repost){
            reload_reposts(postIdToLike);
          }
        });
    }
  }

  function tooltipTextContent() {
    if (likeCount == 1 && liked) return "Você curtiu este post";
    if (likeCount == 2 && liked) return `Você e ${first_liker_name} curtiram este post`;
    if (likeCount == 3 && liked) return `Você, ${first_liker_name} e ${second_liker_name} curtiram este post`;
    if (likeCount >= 4 && liked) return `Você, ${first_liker_name},${second_liker_name} e outras ${likeCount - 3} pessoas curtiram este post`;

    if (likeCount == 1 && !liked) return `${first_liker_name} curtiu este post`;
    if (likeCount == 2 && !liked) return `${first_liker_name} e ${second_liker_name} curtiram este post`;
    if (likeCount >= 3 && !liked) return `${first_liker_name} e ${second_liker_name} e outras ${likeCount - 2} pessoas curtiram este post`;
  }

  function userLoggedInIsOwnerOfThisPost() {
    return user && owner_id && user.id == owner_id;
  }

  return (
    <>
      {showModalDelete ?
        <Modal
          modal_cancel_click={() => setShowModalDelete(false)}
          modal_confirm_click={deleteThis}
          disable_buttons={deleting}
          cancel_button_text="No, go back"
          confirm_button_text="Yes, delete it"
          data_test_cancel_btn="cancel"
          data_test_confirm_btn="confirm"
          disable_buttons_text="Wait.."
          modal_title={`Are you sure you want to delete this ${is_repost ? "repost" : "post"}?`}
        />
        : showModalRepost ?
          <Modal
            modal_cancel_click={() => setShowModalRepost(false)}
            modal_confirm_click={repost}
            disable_buttons={reposting}
            cancel_button_text="No, cancel"
            confirm_button_text="Yes, share!"
            data_test_cancel_btn="cancel"
            data_test_confirm_btn="confirm"
            disable_buttons_text="Wait.."
            modal_title="Do you want to re-post this link?"
          />
          :
          <></>
      }
      <PostContainer $is_repost={is_repost} data-test="post">
        {userLoggedInIsOwnerOfThisPost() && (
          <Actions>
            {!is_repost && <AiFillEdit onClick={(e) => startEdit(e)} className="icon" data-test="edit-btn" />}
            <BiSolidTrashAlt onClick={askDelete} className="icon" data-test="delete-btn" />
          </Actions>
        )}
        {is_repost && <RepostBanner reposted_by_name={reposted_by_name}/>}
        <Tooltip render={({ content }) => content ? <p data-test="tooltip">{content}</p> : null} id="tooltip likes" />
        <AvatarAndActions>
          <img title={name ? name : "Username"} onClick={goToUser} src={avatar_photo_url && validAvatarUrl ? avatar_photo_url : PLACEHOLDER_IMAGE} alt={name} />
          <PostUserAction counter={likeCount} type={"like"} tootltip_content={tooltipTextContent()} tooltip_id={"tooltip likes"} on_click={toggleLike} data_test_text={"counter"} data_test_button={"like-btn"} fill_logic={true} fill_logic_state={liked} />
          <PostUserAction counter={commentsCount} type={"comment"} tootltip_content={null} tooltip_id={"tooltip comment"} on_click={startToComment} data_test_text={"comment-counter"} data_test_button={"comment-btn"} fill_logic={false} fill_logic_state={liked} />
          <PostUserAction counter={repostCount} type={"repost"} tootltip_content={null} tooltip_id={"tooltip repost"} on_click={askRepost} data_test_text={"repost-counter"} data_test_button={"repost-btn"} fill_logic={false} fill_logic_state={liked} />
        </AvatarAndActions>
        <PostInfo>
          <h1 className="user-name" onClick={goToUser} data-test="username">
            {name ? name : "Username"}
          </h1>
          {!editInput && <p data-test="description">{transformTextWithHashtags(description)}</p>}
          {editInput &&
            <PostForm onSubmit={(e) => updatePost(e)}>
              <input
                ref={editRef}
                onKeyDown={(e) => checkForEscapeKeyPress(e, setEditInput, false)}
                onBlur={endEdit}
                value={descriptionEditValue}
                type="text"
                placeholder="Description"
                className="edit-post"
                onChange={(e) => setDescriptionEditValue(e.target.value)}
                data-test="edit-input"
              />
            </PostForm>
          }
          <Metadata link={link} />
        </PostInfo>
      </PostContainer>
    </>
  );
}


const PostContainer = styled.div`
  width: 100%;
  max-width: 611px;
  position: relative;
  background-color: #171717;
  border-radius: 16px;
  display: flex;
  gap: 18px;
  padding: 20px;
  margin-top: ${(props) => props.$is_repost ? "29px" : 0};
  position: relative;
  .react-tooltip{
    max-width: fit-content;
    p{
      font-size: 16px;
      color: white;
    }
  }

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
const AvatarAndActions = styled.div`
  * {
    user-select: none;
  }

  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
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
const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  height: fit-content;
  gap: 7px;
  width: 100%;
  overflow: hidden;

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