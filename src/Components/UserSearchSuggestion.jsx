import React from 'react'
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

export default function UserSearchSuggestion({photo,username,user_id}) {
const placeholderImage = "https://i.kym-cdn.com/entries/icons/facebook/000/016/546/hidethepainharold.jpg";
const navigate = useNavigate();
function goToUser() {
    if (!user_id) return alert("This suggestions doenst have an owner_id prop");

    navigate(`/user/${user_id}`);
}
  return (
    <SCUserSearchSuggestion onClick={goToUser}>
        <img src={photo ? photo : placeholderImage} alt="" />
        <h1 className='username'>{username ? username : "Name"}</h1>
    </SCUserSearchSuggestion>
  )
}

const SCUserSearchSuggestion = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 8px;
    padding-left: 18px;
    padding-right: 18px;
    gap: 12px;
    cursor: pointer;

    &:hover{
        background-color: lightgray;
    }

    img{
        width: 39px;
        height: 39px;
        flex-shrink: 0;
        border-radius: 50%;
        object-fit: cover;
    }

    .username{
        color: #515151;
        font-family: Lato;
        font-size: 19px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
`;
