import styled from "styled-components";

const Input = styled.input`
    font-family: 'Oswald', 'sans-sefif';
    font-size: 27px;
    font-weight: 700;
    line-height: 40px;
    color: black;

    width: 429px;
    height: 65px;
    border: none;
    border-radius: 6px;
    padding-inline: 17px;
    padding-bottom: 5px;

    &::placeholder {    
        color: #9F9F9F;
    }
    &:focus {
        outline: none;
    }

    @media (max-width: 767px) {
        width: calc(100vw - 45px);
        height: 55px;
    }
`;
export default Input;