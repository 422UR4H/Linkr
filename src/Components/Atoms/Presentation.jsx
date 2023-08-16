import { styled } from "styled-components";

export default function Presentation() {
    return (
        <StyledPresentation>
            <h1>linkr</h1>
            <h2>
                save, share and discover<br />
                the best links on the web
            </h2>
        </StyledPresentation>
    );
}

const StyledPresentation = styled.article`
    font-weight: 700;
    color: white;

    background-color: #151515;
    padding-top: 300px;
    padding-left: 144px;
    width: calc(100vw - 535px);
    height: 100vh;

    h1 {
        font-family: 'Passion One', 'cursive';
        font-size: 106px;
        line-height: 117px;
        letter-spacing: 0.05em;
    }
    h2 {
        font-family: 'Oswald', 'sans-serif';
        font-size: 43px;
        line-height: 64px;
    }
    
    @media (max-width: 767px) {
        width: 100vw;
        height: auto;
        padding-inline: 69px;
        padding-block: 10px 27px;
        
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        h1 {
            font-size: 76px;
            line-height: 84px;
            letter-spacing: 0.05em;
            text-align: center;
            margin-bottom: -13px;
        }
        h2 {
            font-size: 23px;
            line-height: 34px;
            text-align: center;
            margin: 0;
        }
    }
`;