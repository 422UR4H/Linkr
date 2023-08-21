import { useEffect, useRef, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai';
import { styled } from 'styled-components';
import SearchSuggestions from './SearchSuggestions.jsx';
import useToken from '../../Hooks/useToken.js';
import api from '../../Services/api.js';


export default function SearchBar({ className }) {
    const searchRef = useRef();
    const { token } = useToken();
    const [searchValue, setSearchValue] = useState("");
    const [searching, setSearching] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [debouncedSearchValue, setDebouncedSearchValue] = useState("");

    useEffect(() => {
        const delay = setTimeout(() => {
            if (debouncedSearchValue.length > 2) {
                performSearch(debouncedSearchValue);
            }
        }, 300);
        return () => clearTimeout(delay);
    }, [debouncedSearchValue]);

    useEffect(() => {
        const delay = setTimeout(() => {
            setDebouncedSearchValue(searchValue);
        }, 300);
        return () => clearTimeout(delay);
    }, [searchValue]);

    function performSearch(query) {
        setSearching(true);
        api.getUsersByName(query, token)
            .then(res => {
                setShowSuggestions(true);
                setSuggestions(res.data);
            })
            .catch((err) => {
                console.log(err);
                setSuggestions([]);
                setShowSuggestions(false);
            })
            .finally(() => setSearching(false));
    }

    function handleSearchChanged({ target }) {
        setSearchValue(target.value);
        setSearching(target.value.length >= 3);
        if (target.value === "") {
            setShowSuggestions(false);
        }
    }

    return (
        <StyledSearchBar className={className}>
            <AiOutlineSearch className='icon' />
            <input
                ref={searchRef}
                value={searchValue}
                onChange={(e) => handleSearchChanged(e)}
                name='search'
                id='search'
                required type="text"
                placeholder='Search for people'
                data-test="search"
            />
            {searchValue.length > 0 && showSuggestions &&
                <SearchSuggestions searching={searching} suggestions={suggestions} />
            }
        </StyledSearchBar>
    )
}

const StyledSearchBar = styled.div`
    width:100%;
    max-width: 611px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    
    @media (max-width: 720px) {
        max-width: 100%;   
    }
    .icon{
        font-size: 30px;
        color: #C6C6C6;
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
    }
    input{
        width: 100%;
        height: 45px;
        flex-shrink: 0;
        border-radius: 8px;
        background: #FFF;
        border: 0;
        padding-left: 14px;

        &:focus{
            outline: none;
        }
        &::placeholder{
            color: #C6C6C6;
            font-family: Lato;
            font-size: 19px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
        }
    }
`;