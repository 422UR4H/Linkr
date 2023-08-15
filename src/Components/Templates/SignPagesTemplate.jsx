import { styled } from 'styled-components'
import Presentation from '../Atoms/Presentation.jsx';

export default function SignPagesTemplate({ children }) {
    return (
        <StyledSignTemplates>
            <Presentation />
            <div className="form-div">
                {children}
            </div>
        </StyledSignTemplates>
    );
}

const StyledSignTemplates = styled.div`
    display: flex;
    
    .form-div {
        background-color: #333333;
        width: 535px;
        height: 100vh;
        padding-top: 317px;

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    a {
        color: white;
        font-family: Lato;
        font-size: 20px;
        font-weight: 400;
        line-height: 24px;

        margin-top: 22px;
    }
`;