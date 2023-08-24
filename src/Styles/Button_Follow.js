import { styled } from "styled-components";

const FollowButton = styled.button`
    color: #FFF;
    font-family: Lato;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    border-radius: 5px;
    background: #1877F2;
    width: 100%;
    max-width: 112px;
    height: 31px;
    border: none;
    cursor: pointer;

    &:focus {
        outline: none;
    }
    &:hover{
        background-color: white;
        color: #1877F2;
    }
    &:disabled {
        background-color: #83b4ef;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    @media (max-width: 720px) {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;
export default FollowButton;