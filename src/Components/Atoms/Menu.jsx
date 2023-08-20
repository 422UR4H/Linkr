import { styled } from 'styled-components';

export default function Menu({ children }) {
    return <StyledMenu>{children}</StyledMenu>
}

const StyledMenu = styled.nav`
    position: absolute;
    right: 0;
    top: 71px;
    background: #151515;
    width: 120px;
    height: 47px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-bottom-left-radius: 20px;
    z-index: 4;

    button {
        color: #FFF;
        font-family: 'Lato', 'sans-serif';
        font-size: 17px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: 0.85px;
        background-color: transparent;
        border: 0;

        width: inherit;
        height: inherit;
        border-bottom-left-radius: inherit;
    }
`;