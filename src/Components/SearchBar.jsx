import React, { useRef, useState } from 'react'
import { styled } from 'styled-components';
import UserSearchSuggestion from './UserSearchSuggestion';
import axios from 'axios';
import { AiOutlineSearch } from 'react-icons/ai';

export default function SearchBar() {
   
    const [searchValue, setSearchValue] = useState("");
    const searchRef = useRef();
    const [searching, setSearching] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    function cancelSearch() {
        setSearching(false);
        setShowSuggestions(false);
    }

    function handleSearchChanged(e) {
        const token = `Bearer ${JSON.parse(localStorage.getItem("token")).token}`;
        setSearchValue(e.target.value);
        setSearching(true);
        if (searchValue == "") return;
        axios.get(`${process.env.REACT_APP_API_URL}/users/${searchValue}`, { headers: { Authorization: token } })
            .then(res => {
                //console.log(res.data);
                setShowSuggestions(true);
                setSuggestions(res.data);
                setSearching(false);
            })
            .catch(err => {
                //console.log(err);
                setSuggestions([]);
                setShowSuggestions(false);
                setSearching(false);
            })
    }

    return (
        <SCSearchBar>
            <AiOutlineSearch className='icon' />
            <input ref={searchRef} value={searchValue} onChange={(e) => handleSearchChanged(e)} name='search' id='search' required type="text" placeholder='Search for people' />
            {
                searchValue.length > 0 && showSuggestions &&
                <SearchSuggestions>
                    {
                        (searching || suggestions.length == 0) &&

                        <SearchDefaultSuggestion>
                            <p>{searching ? "Searching.." : suggestions?.length > 0 ? "" : "No results found"}</p>
                        </SearchDefaultSuggestion>
                    }
                    {
                        suggestions && suggestions.map(user_suggestion => {
                            return (
                                <UserSearchSuggestion
                                    key={user_suggestion.id}
                                    user_id={user_suggestion.id}
                                    photo={user_suggestion.photo}
                                    username={user_suggestion.user_name}
                                />
                            )
                        })
                    }
                </SearchSuggestions>
            }
        </SCSearchBar>
    )
}


const SCSearchBar = styled.div`
max-width: 563px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        
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

const SearchDefaultSuggestion = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    padding: 8px;
    p{
        color: #515151;
        font-family: Lato;
        font-size: 15px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
`;

const SearchSuggestions = styled.nav`
    position: absolute;
    left: 0;
    top: 40px;
    width: 100%;
    height: fit-content;
    border-radius: 8px;
    background: #E7E7E7;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    z-index: 3;
`;