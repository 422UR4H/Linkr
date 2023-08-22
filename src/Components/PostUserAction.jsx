import React from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BiRepost } from 'react-icons/bi'
import { FaRegCommentDots } from 'react-icons/fa';
import { styled } from 'styled-components';

export default function PostUserAction({ counter ,type,on_click,tooltip_id,tootltip_content,data_test_text,data_test_button, fill_logic = false,fill_logic_state = false }) {
    return (
        <>
        {
            fill_logic ?

            (
                <SCPostUserAction>
                    {fill_logic_state ? <AiFillHeart data-test={data_test_button} onClick={on_click} className="like-btn full" /> : <AiOutlineHeart data-test={data_test_button} onClick={on_click} className="like-btn empty" />}
                    <span data-tooltip-id={tooltip_id} data-tooltip-content={tootltip_content} data-test={data_test_text}>
                        {counter} likes
                    </span>
                </SCPostUserAction>
            )
            :

            <>
            {
                type == "repost" ?

                <SCPostUserAction>
                    <BiRepost data-test={data_test_button} className="repost-btn"  onClick={on_click}  />
                    <span data-tooltip-id={tooltip_id} data-tooltip-content={tootltip_content} data-test={data_test_text}>
                        {counter} reposts
                    </span>
                </SCPostUserAction>

                : type == "comment" ?

                <SCPostUserAction>
                    <FaRegCommentDots data-test={data_test_button} className="comment-btn"  onClick={on_click}  />
                    <span data-tooltip-id={tooltip_id} data-tooltip-content={tootltip_content} data-test={data_test_text}>
                        {counter} comments
                    </span>
                </SCPostUserAction>
                :

                <>
                <p style={{color:"red",fontSize:30}}>Wrong type</p>
                </>
            }
            </>
        }
        </>     
    )
}

const SCPostUserAction = styled.button`
  background-color: inherit;
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 20px;
  border: none;
  padding: 0;
  gap:4px;
  cursor: default;
  span{
    white-space: nowrap;
  }

  &:first-of-type{
    margin-top: 3px;
  }

  * {
    user-select: none;
  }

  .full {
    color: red;
  }

  .empty,.comment-btn, .repost-btn {
    color: white;
  }

  .like-btn, .comment-btn, .repost-btn {
    cursor: pointer;
  }
`;