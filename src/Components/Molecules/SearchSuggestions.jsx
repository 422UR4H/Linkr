import { styled } from "styled-components";
import UserSearchSuggestion from '../Atoms/UserSearchSuggestion';

export default function SearchSuggestions({ searching, suggestions }) {
    return (
        <StyledSearchSuggestions>
            {(searching || suggestions.length == 0) &&

                <StyledSearchDefaultSuggestion>
                    <p>
                        {searching ? "Searching..." :
                            suggestions?.length > 0 ?
                                "" : "No results found"
                        }
                    </p>
                </StyledSearchDefaultSuggestion>
            }
            {suggestions &&
                suggestions.map(s => (
                    <UserSearchSuggestion
                        key={s.id}
                        user_id={s.id}
                        photo={s.photo}
                        username={s.user_name}
                    />
                ))
            }
        </StyledSearchSuggestions>
    )
}

const StyledSearchSuggestions = styled.nav`
    background: #E7E7E7;
    width: 100%;
    height: fit-content;
    border-radius: 8px;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    
    position: absolute;
    left: 0;
    top: 40px;
    z-index: 3;
`;

const StyledSearchDefaultSuggestion = styled.div`
    width: 100%;
    height: 40px;
    padding: 8px;

    display: flex;
    align-items: center;
    justify-content: center;

    p{
        color: #515151;
        font-family: 'Lato';
        font-size: 15px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
`;