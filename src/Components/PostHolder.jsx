import { DEFAULT_HEIGHT_POST } from '../Utils/constants.js';
import { useState } from 'react';
import { styled } from 'styled-components';
import ContainerComments from './Molecules/ContainerComments.jsx';
import Post from './Post.jsx';


export default function PostHolder(props) {
    const [marginBottom, setMarginBottom] = useState(0);
    const [showComments, setShowComments] = useState(false);
    const [heightPost, setHeightPost] = useState(DEFAULT_HEIGHT_POST);

    function updateHeight(value) {
        setHeightPost(value);
    }

    function toggleShowComments() {
      setMarginBottom(showComments ? 0 : 83);
      setShowComments(!showComments);
    }

    return (
        <StyledPostHolder $is_repost={props.is_repost} $marginBottom={marginBottom}>
            {/* bring RepostBanner here */}
            <Post {...props} toggleShowComments={toggleShowComments} updateHeight={updateHeight} />
            {showComments && <ContainerComments heightPost={heightPost} post_id={props.post_id} setMarginBottom={setMarginBottom} />}
        </StyledPostHolder>
    );
}

const StyledPostHolder = styled.div`
    width: 100%;
    border-radius: 16px;
    max-width: 612px;
    margin-top: ${({ $is_repost }) => $is_repost ? "29px" : 0};
    margin-bottom: ${({ $marginBottom }) => $marginBottom}px;

    position: relative;

    @media (max-width: 720px) {
        max-width: 100%;
        border-radius: 0;
    }
`;