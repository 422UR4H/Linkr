import { styled } from "styled-components"

export default function Hashtag({ onClick, children }) {
    return <StyledHashtag className="hash" onClick={onClick} data-test="hashtag">#{children}</StyledHashtag>
}

const StyledHashtag = styled.p`
    color: #FFFFFF;
    font-family: 'Lato', sans-serif;
    font-size: 19px;
    font-weight: 700;
    line-height: 23px;
    letter-spacing: 0.05em;
    cursor:pointer;

    @media (max-width: 720px) {
        font-size: 15px;
        border-radius: 10px;
        border: 1px solid #7f7f7f;
        padding-left: 5px;
        padding-right: 5px;
    }

    @media (max-width: 500px) {
        font-size: 12px;
    }
`;