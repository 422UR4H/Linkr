import React, { useState } from 'react'
import styled from "styled-components";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
export default function Post({ user_name, avatar_photo_url, like_count, name, description, link, default_liked = false }) {

    const [liked, setLiked] = useState(default_liked);
    
    function like() {
        setLiked(true);
    }

    function dislike() {
        setLiked(false);
    }

    return (
        <PostContainer>
            <AvatarAndLikes>
                <img src={avatar_photo_url ? avatar_photo_url : "https://i.kym-cdn.com/entries/icons/facebook/000/016/546/hidethepainharold.jpg"} alt={user_name} />
                <Likes>
                    {liked ? <AiFillHeart onClick={dislike} className='like-btn full' /> : <AiOutlineHeart onClick={like} className='like-btn empty' />}

                    <span>{like_count ? like_count : 0} likes</span>
                </Likes>
            </AvatarAndLikes>
            <PostInfo>
                <h3>{name ? name : "Juvenal Juvêncio"}</h3>
                <p>{description ? description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere libero perferendis suscipit, delectus eaque facilis consequatur et inventore cupiditate, ipsam deserunt, officiis ullam vero dicta dignissimos rerum odit illum autem."}</p>
                <a href={link} target="_blank" rel="noreferrer"></a>
            </PostInfo>
        </PostContainer>
    )
}

const PostInfo = styled.div`
    display: flex;
    flex-direction: column;
    color: white;
    gap: 7px;

    h3{
        color: #FFF;
        font-family: Lato;
        font-size: 19px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }

    p{
        color: #B7B7B7;
        font-family: Lato;
        font-size: 17px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;

        span{
            color: #FFF;
            font-family: Lato;
            font-size: 17px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
        }
    }
`;

const Likes = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 4px;
    font-size: 20px;

    *{
        user-select: none;
    }
    
    .full{
        color: red;
    }

    .empty{
        color: white;
    }

    .like-btn{
        cursor: pointer;
    }

    span{
        color: #FFF;
        text-align: center;
        font-family: Lato;
        font-size: 11px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
`;

const AvatarAndLikes = styled.div`
    *{
        user-select: none;
    }
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    justify-content: flex-start;

    img{
        width: 50px;
        height: 50px;
        flex-shrink: 0;
        border-radius: 26.5px;
        object-fit: cover;
        cursor: pointer;
    }
`;

const PostContainer = styled.div`

    width: 100%;
    max-width: 611px;
    min-height: 276px;
    background-color: #171717;
    border-radius: 16px;
    display: flex;
    gap: 18px;
    padding: 20px;

`;
