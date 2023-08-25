import { useEffect, useRef, useState } from "react";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { styled } from "styled-components";
import useToken from "../../Hooks/useToken.js";
import Comment from "../Atoms/Comment.jsx";
import Avatar from "../Atoms/Avatar.jsx";
import api from "../../Services/api.js";
import useUser from "../../Hooks/useUser.js";


export default function ContainerComments({ post_id, setMarginBottom, heightPost }) {
    const { user } = useUser();
    const { token } = useToken();
    const commentsRef = useRef(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        api.getCommentsByPost(post_id, token)
            .then(({ data }) => {
                data.forEach(d => {
                    d.status = d.writer_id === user.id ? "• post’s author" : d.is_follower ? "• following" : "";
                });
                setComments(data);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        console.log(comments)
        setMarginBottom(commentsRef.current.getBoundingClientRect().height);
    }, [comments]);

    function handleSubmit(e) {
        e.preventDefault();

        // apagar isto e adicionar função que envia o comment
        setMarginBottom(commentsRef.current.getBoundingClientRect().height);
        console.log(commentsRef.current.getBoundingClientRect().height);
    }

    return (
        <StyledContainerComments ref={commentsRef} $height={heightPost} data-test="comment-box">
            {comments?.map(c => (
                <Comment
                    key={c.id}
                    comment={c.comment}
                    urlPhoto={c.photo}
                    userName={c.user_name}
                    status={c.status}
                />
            ))}
            <form onSubmit={handleSubmit}>
                <Avatar />
                <input
                    name="comment"
                    type="text"
                    placeholder="write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    maxLength={255}
                    required
                    data-test="comment-input"
                />
                <button type="submit" data-test="comment-submit">
                    <IoPaperPlaneOutline className="icon" />
                </button>
            </form>
        </StyledContainerComments>
    );
}

const StyledContainerComments = styled.div`
    background-color: #1E1E1E;
    width: inherit;
    padding: 25px;
    border-radius: 0 0 16px 16px;

    display: flex;
    flex-direction: column;

    position: absolute;
    top: ${({ $height }) => $height - 20}px;
    left: 0;
    z-index: 1;

    form {
        height: 39px;
        margin-top: 19px;

        display: flex;
        align-items: center;

        position: relative;

        img {
            width: 39px;
            height: inherit;
        }

        input {
            font-family: 'Lato', sans-serif;
            font-size: 14px;
            font-weight: 400;
            line-height: 17px;
            letter-spacing: 0.05em;
            /* color: #ACACAC; */
            color: #F3F3F3;
    
            background-color: #252525;
            width: 100%;
            height: inherit;
            border: none;
            border-radius: 8px;
            margin-left: 14px;
            padding-inline: 15px 35px;
    
            &::placeholder {
                color: #575757;
                font-style: italic;
            }
            &:focus {
                outline: none;
            }
        }
    
        button {
            background-color: transparent;
            border: none;
            cursor: pointer;
    
            display: flex;
            align-items: center;
            justify-content: center;
    
            position: absolute;
            right: 5px;
            bottom: 11px;
    
            &:focus {
                outline: none;
            }
            .icon {
                color: white;
                width: 16px;
                height: 16px;
            }
        }
    }
`;