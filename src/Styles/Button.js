import { styled } from "styled-components";

const Button = styled.button`
    font-family: 'Oswald', 'sans-serif';
    font-size: 27px;
    font-weight: 700;
    line-height: 40px;
    color: white;

    background-color: #1877F2;
    width: 429px;
    height: 65px;
    border-radius: 6px;
    border: none;
    cursor: pointer;

    &:focus {
        outline: none;
    }
    &:hover{
    background-color: #0052CC;
    }
    &:disabled {
        background-color: #83b4ef;
        
        display: flex;
        justify-content: center;
        align-items: center;
    }

    @media (max-width: 767px) {
        width: calc(100vw - 45px);
        height: 55px;
    }
`;
export default Button;