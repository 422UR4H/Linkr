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

    &:hover{
        cursor:pointer;
    }
`;