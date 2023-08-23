import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { PLACEHOLDER_IMAGE } from "../../Utils/constants";

export default function UserSearchSuggestion({ photo, username, user_id ,following}) {
  const navigate = useNavigate();

  function goToUser() {
    if (!user_id) return alert("This suggestions doenst have an owner_id prop");
    window.open(`/user/${user_id}`,"_self")
  }
  return (
    <StyledUserSearchSuggestion onClick={goToUser} data-test="user-search">
      <img src={photo ? photo : PLACEHOLDER_IMAGE} alt={username} />
      <h1 className="username">{username ? username : "Name"}</h1>
      {following && <p className="following">• following</p>}
    </StyledUserSearchSuggestion>
  );
}

const StyledUserSearchSuggestion = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 8px;
  padding-left: 18px;
  padding-right: 18px;
  gap: 12px;
  cursor: pointer;
  &:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  &:hover {
    background-color: lightgray;
  }

  img {
    width: 39px;
    height: 39px;
    flex-shrink: 0;
    border-radius: 50%;
    object-fit: cover;
  }

  .username {
    color: #515151;
    font-family: Lato;
    font-size: 19px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  p{
    width: 140px;
    height: 18px;
    flex-shrink: 0;
    color: #C5C5C5;
    font-family: Lato;
    font-size: 19px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;
