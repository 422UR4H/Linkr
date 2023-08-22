import React from 'react'
import { styled } from 'styled-components';

export default function Modal({
    modal_cancel_click,
    modal_confirm_click,
    disable_buttons,
    cancel_button_text = "No, go back",
    disable_buttons_text = "Wait..",
    confirm_button_text = "Yes",
    data_test_confirm_btn = "confirm",
    data_test_cancel_btn = "cancel",
    modal_title = "Are you sure?"
}) {

    function closeModal(e) {
        if (disable_buttons) return;
        e.preventDefault();
        modal_cancel_click();
    }

    return (
        <SCModal onClick={closeModal}>
            <QuestionBox onClick={(e) => e.stopPropagation()}>
                <h1>{modal_title}</h1>
                <div className="actions">
                    <button disabled={disable_buttons} onClick={() => modal_cancel_click()} data-test={data_test_cancel_btn}>{cancel_button_text}</button>
                    <button disabled={disable_buttons} onClick={() => modal_confirm_click()} data-test={data_test_confirm_btn}>{disable_buttons ? disable_buttons_text : confirm_button_text}</button>
                </div>
            </QuestionBox>
        </SCModal>
    )
}
const SCModal = styled.main`
  width: 100%;
  height:100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  background: rgba(255, 255, 255, 0.90);
  display: flex;
  align-items:center;
  justify-content: center;
`;

const QuestionBox = styled.div`
  width: 100%;
  max-width: 597px;
  height: 100%;
  max-height: 262px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333333;
  flex-direction: column;
  border-radius: 50px;
  gap:20px;
  padding:20px;

  h1{
    color: #FFF;
    text-align: center;
    font-family: Lato;
    font-size: 34px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  .actions{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 100%;

    button{
      width: 100%;
      max-width:134px;
      height: 37px;
      color: white;
      border: 0;
      border-radius: 5px;
      background: #1877F2;

      &:enabled{
          &:hover{
          background: #FFF;
          color: #1877F2;
        }
      }
      &:disabled{
        opacity: 50%;
        cursor: not-allowed;
      }
    }
  }

  @media (max-width: 597px) {
    border-radius: 0;
  }

`;