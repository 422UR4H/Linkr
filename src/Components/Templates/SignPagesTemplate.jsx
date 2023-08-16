import { styled } from 'styled-components'
import Presentation from '../Atoms/Presentation.jsx';


export default function SignPagesTemplate({ children, margin }) {
    return (
        <StyledSignTemplates $margin={margin}>
            <Presentation />
            <div className="form-div">
                {children}
            </div>
        </StyledSignTemplates>
    );
}
SignPagesTemplate.defaultProps = { margin: "317px" };


export const StyledSignTemplates = styled.div`
    display: flex;
    
    .form-div {
        background-color: #333333;
        width: 535px;
        /* height: 100vh; */
        margin-top: ${({ $margin }) => $margin};
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    a {
        color: white;
        font-size: 20px;
        font-weight: 400;
        line-height: 24px;

        margin-top: 22px;
    }

    @media (max-width: 767px) {
        flex-direction: column;

        .form-div {
            flex-direction: column;
            width: 100vw;
            height: 175px;
            padding-top: 40px;
            padding-inline: 23px;
        }
    }
`;