import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import Post from './Post.jsx';
import ContainerComments from './Molecules/ContainerComments.jsx';
import { DEFAULT_HEIGHT_POST } from '../Utils/constants.js';

export default function PostHolder(props) {
    const [marginBottom, setMarginBottom] = useState(0);
    const [showComments, setShowComments] = useState(false);
    // const [height, setHeight] = useState(DEFAULT_HEIGHT_POST);
    const [heightPost, setHeightPost] = useState(DEFAULT_HEIGHT_POST);
    // const postRef = useRef(null);

    useLayoutEffect(() => {
            // console.log("PostHolder useLayoutEffect ")
            // console.log(postRef.current?.getBoundingClientRect())
            // setHeight(postRef.current?.getBoundingClientRect().height);
    }, [showComments, props]);

    function updateHeight(value) {
        setHeightPost(value);
        // if (postRef.current !== null) {
            // console.log("PostHolder update height if ")
        //     console.log(postRef.current)
        //     setHeight(postRef.current?.getBoundingClientRect().height);
        // } else {
        //     console.log("PostHolder update height else ")
        //     console.log(postRef.current)
        //     setHeight(postRef.current?.getBoundingClientRect().height);
        // }
    }

    // test function
    function updateMarginBottom(value) {
        // console.log(postRef.current?.getBoundingClientRect())
        setMarginBottom(value);
    }

    function toggleShowComments() {
      setMarginBottom(showComments ? 0 : 83);
      setShowComments(!showComments);
    }

    return (
        <StyledPostHolder /*$height={height}*/ $is_repost={props.is_repost} $marginBottom={marginBottom}>
            {/* bring RepostBanner here */}
            <Post {...props} toggleShowComments={toggleShowComments} updateHeight={updateHeight} /*ref={postRef}*/ />
            {showComments && <ContainerComments heightPost={heightPost} post_id={props.post_id} setMarginBottom={updateMarginBottom} />}
        </StyledPostHolder>
    );
}

const StyledPostHolder = styled.div`
    width: 100%;
    /* height: ${({ $height }) => $height}px; */
    background-color: red;
    border-radius: 16px;
    max-width: 612px;
    margin-top: ${({ $is_repost }) => $is_repost ? "29px" : 0};
    margin-bottom: ${({ $marginBottom }) => $marginBottom}px;
    /* border: 1px solid rgba(255, 255, 255, 1); */

    position: relative;
    /* z-index: 0; */

    @media (max-width: 720px) {
        max-width: 100%;
        border-radius: 0;
    }
`;