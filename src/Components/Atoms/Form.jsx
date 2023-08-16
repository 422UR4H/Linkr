import { styled } from "styled-components";

export default function Form({ children, onSubmit }) {
    return (
        <StyledForm onSubmit={onSubmit}>
            {children}
        </StyledForm>
    );
}

const StyledForm = styled.form`
    gap: 13px;

    display: flex;
    flex-direction: column;
    align-items: center;

    @madia (max-width: 767px) {
        gap: 11px;
    }
`;