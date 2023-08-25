import React from 'react'
import { styled } from 'styled-components';
import Avatar from './Avatar.jsx';

export default function Comment({ comment, urlPhoto, userName, status }) {
    return (
        <StyledComment data-test="comment">
            <Avatar src={urlPhoto} alt={userName} />
            <div>
                <div>
                    <h1>{userName}</h1>
                    {status && <span>{status}</span>}
                </div>
                <p>{comment}</p>
            </div>
        </StyledComment>
    );
}

const StyledComment = styled.div`
    display: flex;
    align-items: center;
    padding-block: 16px;
    border-bottom: 1px solid #353535;
    
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    line-height: 17px;
    font-weight: 400;

    h1 {
        color: #F3F3F3;
        font-weight: 700;
    }
    p {
        color: #ACACAC;
        margin-top: 3px;
    }
    img {
        width: 39px;
        height: 39px;
        margin-right: 18px;
    }
    &>div {
        flex-direction: column;

        &>div {
            display: flex;

            span {
                color: #565656;
                margin-left: 4px;
            }
        }
    }
`;