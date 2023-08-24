import { styled } from "styled-components";
import Comment from "../Atoms/Comment.jsx";
import Avatar from "../Atoms/Avatar.jsx";
import { useState } from "react";
import { IoPaperPlaneOutline } from "react-icons/io5";


export default function ContainerComments({ comments }) {
    const [comment, setComments] = useState("");

    return (
        <StyledContainerComments data-test="comment-box">
            {comments?.map(c => (
                <Comment
                    comment={c.comment}
                    urlPhoto={c.photo}
                    userName={c.user_name}
                    status={null}
                />
            )) || <span>No comments yet</span>}
            <form>
                <Avatar />
                <input
                    name="comment"
                    type="text"
                    placeholder="write a comment..."
                    value={comment}
                    onChange={(e) => setComments(e.target.value)}
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
    border-radius: 0 0 16px 16px;

    position: absolute;
    bottom: -70px;
    left: 0;
    z-index: 1;

    form {
        display: flex;
        align-items: center;

        input {
            font-family: 'Lato', sans-serif;
            font-size: 14px;
            font-weight: 400;
            line-height: 17px;
            letter-spacing: 0.05em;
            color: #ACACAC;
    
            background-color: #252525;
            width: 510px;
            height: 39px;
            border: none;
            border-radius: 8px;
            padding-inline: 15px 35px;
            /* padding-bottom: 5px; */
    
            position: relative;
    
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
            bottom: 10px;
    
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