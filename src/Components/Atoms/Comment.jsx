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

    &>div {
        flex-direction: column;
    }
`;