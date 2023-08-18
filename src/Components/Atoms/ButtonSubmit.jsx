import { ThreeDots } from "react-loader-spinner";
import { styled } from "styled-components";

export default function ButtonSubmit({ disabled, datatest, children }) {
    return (
        <StyledButtonSubmit type="submit" disabled={disabled} data-test={datatest}>
            {disabled ?
                <ThreeDots
                    height="35"
                    color="white"
                    ariaLabel="three-dots-loading"
                />
                :
                children
            }
        </StyledButtonSubmit>
    );
}
ButtonSubmit.defaultPropt = { disabled: false };

const StyledButtonSubmit = styled.button`
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